import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import User from '../models/user';
import Role from '../models/role';
import { UserInstance, UserWithRelations, TokenPayload } from '../types/models';
import { TokenRequest } from '../middleware/authMiddleware';
import CharacterClass from '../models/characterClass';

interface SignInBody {
  username: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

const generateToken = (user: UserInstance, role: string): string => {
  const payload: TokenPayload = {
    id: user.id,
    email: user.email,
    role: role
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const signUp = async (req: Request, res: Response) => {
  const { 
    username, 
    email, 
    password,
    age,
    gender,
    runDistance,
    dumbbellWeight,
    selectedClass
  } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      res.status(400).json({
        message: 'Player with this email or nickname already exists'
      });
      return
    }

    const playerRole = await Role.findOne({
      where: { name: 'player' }
    });

    if (!playerRole) {
      res.status(500).json({
        message: 'Player role not found'
      });
      return
    }

    const characterClass = await CharacterClass.findOne({
      where: { name: selectedClass }
    });

    if (!characterClass) {
      res.status(400).json({
        message: 'Invalid character class'
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      roleId: playerRole.id,
      classId: characterClass.id,
      lastRunDistance: runDistance,
      lastDumbbellWeight: dumbbellWeight,
    });

    const token = generateToken(user, 'player');

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        class: characterClass.name,
        lastRunDistance: user.lastRunDistance,
        lastDumbbellWeight: user.lastDumbbellWeight,
        role: 'player'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Error during registration'
    });
  }
};

export const signIn = async (req: Request<{}, {}, SignInBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Role,
          attributes: ['name']
        },
        {
          model: CharacterClass,
          attributes: ['name']
        }
      ]
    }) as UserWithRelations;

    if (!user) {
      res.status(401).json({
        message: 'Invalid email or password'
      });
      return
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        message: 'Invalid email or password'
      });
      return
    }

    const token = generateToken(user, user.Role?.name || 'player');

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        class: user.CharacterClass?.name,
        lastRunDistance: user.lastRunDistance,
        lastDumbbellWeight: user.lastDumbbellWeight,
        role: user.Role?.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Error during login'
    });
  }
};

export const tokenVerify = async (req: TokenRequest, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id },
      include: [
        {
          model: Role,
          attributes: ['name']
        },
        {
          model: CharacterClass,
          attributes: ['name']
        }
      ]
    }) as UserWithRelations;

    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
      return
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        class: user.CharacterClass?.name,
        lastRunDistance: user.lastRunDistance,
        lastDumbbellWeight: user.lastDumbbellWeight,
        role: user.Role?.name
      },
      token: req.token
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      message: 'Error during token verification'
    });
  }
};