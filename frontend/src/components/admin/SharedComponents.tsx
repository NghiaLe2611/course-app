import { ReactNode } from 'react';

export function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-8">{title}</h1>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatsCard({
  title,
  value,
  trend,
  icon: Icon
}: {
  title: string;
  value: string | number;
  trend?: { value: number; label: string };
  icon: any;
}) {
  const isPositive = trend && trend.value > 0;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-blue-50 rounded-full p-3">
          <Icon className="text-blue-500 text-xl" />
        </div>
      </div>
      {trend && (
        <div className={`mt-4 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          <span className="text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </Card>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = 'primary'
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export function Table({
  headers,
  children
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}