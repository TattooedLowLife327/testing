import { useRef } from 'react';

interface ScrollInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function ScrollInput(props: ScrollInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return <input ref={inputRef} onFocus={handleFocus} {...props} />;
}
