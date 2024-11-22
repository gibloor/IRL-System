import styles from './styles.module.css';

export interface IconBaseProps {
  width: number;
  height: number;
  viewBox: string;
  children: React.ReactNode;
}

const SVGTemplate = ({ 
  width, 
  height,
  viewBox,
  children 
}: IconBaseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      className='icon'
    >
      {children}
    </svg>
  );
};

export default SVGTemplate;