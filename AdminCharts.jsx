import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
  AreaChart, Area
} from "recharts";

const lineData = [
  { name: "Mon", users: 5 },
  { name: "Tue", users: 8 },
  { name: "Wed", users: 6 },
  { name: "Thu", users: 10 },
  { name: "Fri", users: 7 },
];

const areaData = [
  { name: "Week 1", activity: 20 },
  { name: "Week 2", activity: 35 },
  { name: "Week 3", activity: 25 },
  { name: "Week 4", activity: 45 },
];

const pieData = [
  { name: "Low", value: 30 },
  { name: "Medium", value: 50 },
  { name: "High", value: 20 },
];

const barData = [
  { name: "Underweight", count: 2 },
  { name: "Normal", count: 5 },
  { name: "Overweight", count: 3 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function AdminCharts({
  lineData = [],
  barData = [],
  pieData = [],
  areaData = []
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* LINE CHART */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 transition duration-300 hover:scale-[1.02] hover:shadow-2xl p-4">
        <h3 className="font-semibold mb-2">User Activity (Logins)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 transition duration-300 hover:scale-[1.02] hover:shadow-2xl p-4">
        <h3 className="font-semibold mb-2">BMI Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <Bar dataKey="count" fill="#6366f1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 transition duration-300 hover:scale-[1.02] hover:shadow-2xl p-4">
        <h3 className="font-semibold mb-2">Stress Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* AREA CHART */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 transition duration-300 hover:scale-[1.02] hover:shadow-2xl p-4">
        <h3 className="font-semibold mb-2">Wellness Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <Area type="monotone" dataKey="wellness" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
