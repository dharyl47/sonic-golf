// components/HoleInput.tsx

'use client';

interface HoleInputProps {
  holeNumber: number;
  par: number;
  value: number;
  onChange: (value: number) => void;
}

export default function HoleInput({ holeNumber, par, value, onChange }: HoleInputProps) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <span className="font-medium">Hole {holeNumber}</span> <span className="text-sm text-gray-500">(Par {par})</span>
      </div>
      <input
        type="number"
        min={1}
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 p-2 border border-gray-300 rounded text-center"
      />
    </div>
  );
}
