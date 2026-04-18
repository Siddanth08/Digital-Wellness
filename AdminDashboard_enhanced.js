import React, { useState, useEffect } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
  AreaChart, Area,
  Legend,
  ComposedChart
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6", "#f59e0b"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Data for all charts
  const lineData = [
    { name: "Mon", users: 5, sessions: 12 },
    { name: "Tue", users: 8, sessions: 18 },
    { name: "Wed", users: 6, sessions: 15 },
    { name: "Thu", users: 10, sessions: 22 },
    { name: "Fri", users: 7, sessions: 16 },
    { name: "Sat", users: 12, sessions: 28 },
    { name: "Sun", users: 9, sessions: 20 },
  ];

  const dietData = [
    { name: "Breakfast", completed: 85, target: 100 },
    { name: "Lunch", completed: 78, target: 100 },
    { name: "Dinner", completed: 92, target: 100 },
    { name: "Snacks", completed: 65, target: 100 },
  ];

  const workoutData = [
    { name: "Cardio", minutes: 45, goal: 60 },
    { name: "Strength", minutes: 35, goal: 45 },
    { name: "Flexibility", minutes: 20, goal: 30 },
    { name: "Sports", minutes: 60, goal: 90 },
  ];

  const sleepData = [
    { name: "Mon", hours: 7.2 },
    { name: "Tue", hours: 6.8 },
    { name: "Wed", hours: 8.1 },
    { name: "Thu", hours: 7.5 },
    { name: "Fri", hours: 6.9 },
    { name: "Sat", hours: 8.5 },
    { name: "Sun", hours: 8.2 },
  ];

  const screenTimeData = [
    { name: "Work", hours: 8.5, color: "#3b82f6" },
    { name: "Entertainment", hours: 3.2, color: "#ef4444" },
    { name: "Social", hours: 2.1, color: "#8b5cf6" },
    { name: "Other", hours: 1.8, color: "#06b6d4" },
  ];

  const wellnessData = [
    { name: "Excellent", value: 35, color: "#22c55e" },
    { name: "Good", value: 45, color: "#3b82f6" },
    { name: "Needs Attention", value: 20, color: "#facc15" }
  ];

  const activityTypeData = [
    { name: "Cardio", value: 28, color: "#ef4444" },
    { name: "Strength", value: 22, color: "#8b5cf6" },
    { name: "Flexibility", value: 15, color: "#06b6d4" },
    { name: "Sports", value: 25, color: "#22c55e" },
    { name: "Others", value: 10, color: "#f59e0b" }
  ];

  const dailyActivityData = [
    { name: "Mon", steps: 8500, calories: 450, active: 65 },
    { name: "Tue", steps: 9200, calories: 520, active: 72 },
    { name: "Wed", steps: 7800, calories: 380, active: 58 },
    { name: "Thu", steps: 10500, calories: 620, active: 85 },
    { name: "Fri", steps: 9100, calories: 480, active: 68 },
    { name: "Sat", steps: 11200, calories: 680, active: 95 },
    { name: "Sun", steps: 10800, calories: 640, active: 92 }
  ];

  const stressDistributionData = [
    { name: "Low (1-3)", value: 25, color: "#22c55e" },
    { name: "Moderate (4-6)", value: 40, color: "#facc15" },
    { name: "High (7-8)", value: 22, color: "#f97316" },
    { name: "Very High (9-10)", value: 13, color: "#ef4444" }
  ];

  const bmiCategoryData = [
    { name: "Underweight", value: 8 },
    { name: "Normal", value: 45 },
    { name: "Overweight", value: 32 },
    { name: "Obese", value: 15 }
  ];

  const nutritionCategoryData = [
    { name: "Balanced Diet", value: 48, color: "#22c55e" },
    { name: "High Carb", value: 22, color: "#3b82f6" },
    { name: "High Fat", value: 18, color: "#ef4444" },
    { name: "Low Calorie", value: 12, color: "#facc15" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'diet', label: 'Diet & Nutrition', icon: '🥗' },
    { id: 'workout', label: 'Fitness & Workout', icon: '💪' },
    { id: 'sleep', label: 'Sleep Quality', icon: '😴' },
    { id: 'screen', label: 'Screen Time', icon: '📱' },
    { id: 'mental', label: 'Mental Wellness', icon: '🧠' },
  ];

  const renderOverview = () => (
    <div className={`space-y-8 ${animated ? 'animate-fade-in' : ''}`}>
      {/* HERO STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Users", value: "1,247", change: "+12%", icon: "👥", color: "from-blue-500 to-cyan-500" },
          { title: "Wellness Score", value: "84%", change: "+5%", icon: "⭐", color: "from-green-500 to-emerald-500" },
          { title: "Avg Sleep", value: "7.4h", change: "+0.3h", icon: "🌙", color: "from-purple-500 to-indigo-500" },
          { title: "Screen Time", value: "6.2h", change: "-0.8h", icon: "📱", color: "from-orange-500 to-red-500" }
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-up`} style={{animationDelay: `${i * 0.1}s`}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                <span className="text-white/90 text-sm">{stat.change} from last week</span>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRID - ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* USER ACTIVITY CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span> User Activity Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* SCREEN TIME PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⏰</span> Daily Screen Time Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={screenTimeData}
                dataKey="hours"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={(entry) => `${entry.hours}h`}
              >
                {screenTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {screenTimeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold">{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS GRID - ROW 2: PIE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* WELLNESS DISTRIBUTION PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Wellness Status
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={wellnessData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={(entry) => `${entry.value}%`}
              >
                {wellnessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {wellnessData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY TYPE PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🏃</span> Activity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={activityTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={(entry) => `${entry.value}%`}
              >
                {activityTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {activityTypeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* STRESS DISTRIBUTION PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">😰</span> Stress Levels
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stressDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={(entry) => `${entry.value}%`}
              >
                {stressDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {stressDistributionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS GRID - ROW 3: BAR CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DAILY ACTIVITY BAR CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🚶</span> Daily Steps & Calories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyActivityData}>
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar dataKey="steps" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="calories" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BMI CATEGORY BAR CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚖️</span> BMI Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bmiCategoryData}>
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS GRID - ROW 4: WORKOUT & NUTRITION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WORKOUT BREAKDOWN BAR CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💪</span> Weekly Workout Minutes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <XAxis dataKey="name" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Bar dataKey="minutes" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="goal" fill="#fbbf24" opacity={0.5} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NUTRITION TYPE PIE CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🥗</span> Diet Classification
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={nutritionCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={(entry) => `${entry.value}%`}
              >
                {nutritionCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {nutritionCategoryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🤖</span> AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "📈", title: "Trending Up", desc: "Sleep quality improved by 15% this week" },
            { icon: "⚠️", title: "Attention Needed", desc: "Screen time exceeds healthy limits" },
            { icon: "🎯", title: "Goal Achieved", desc: "85% users met weekly fitness goals" }
          ].map((insight, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl mb-2">{insight.icon}</div>
              <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
              <p className="text-white/80 text-sm">{insight.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-4xl">💖</span> Digital Wellness Dashboard
        </h1>
        <p className="text-white/60">Comprehensive health analytics and wellness insights</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-screen">
        {activeTab === 'overview' && renderOverview()}
      </div>
    </div>
  );
}
