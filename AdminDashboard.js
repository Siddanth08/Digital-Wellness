import React, { useState, useEffect } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
  AreaChart, Area,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6", "#f59e0b"];

// Main React component for the admin dashboard, managing tabs and rendering sections
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Sample data for the user activity line chart
  const lineData = [
    { name: "Mon", users: 5, sessions: 12 },
    { name: "Tue", users: 8, sessions: 18 },
    { name: "Wed", users: 6, sessions: 15 },
    { name: "Thu", users: 10, sessions: 22 },
    { name: "Fri", users: 7, sessions: 16 },
    { name: "Sat", users: 12, sessions: 28 },
    { name: "Sun", users: 9, sessions: 20 },
  ];

  // Sample data for diet completion rates
  const dietData = [
    { name: "Breakfast", completed: 85, target: 100 },
    { name: "Lunch", completed: 78, target: 100 },
    { name: "Dinner", completed: 92, target: 100 },
    { name: "Snacks", completed: 65, target: 100 },
  ];

  // Sample data for workout minutes and goals
  const workoutData = [
    { name: "Cardio", minutes: 45, goal: 60 },
    { name: "Strength", minutes: 35, goal: 45 },
    { name: "Flexibility", minutes: 20, goal: 30 },
    { name: "Sports", minutes: 60, goal: 90 },
  ];

  // Sample data for sleep duration over the week
  const sleepData = [
    { name: "Mon", hours: 7.2 },
    { name: "Tue", hours: 6.8 },
    { name: "Wed", hours: 8.1 },
    { name: "Thu", hours: 7.5 },
    { name: "Fri", hours: 6.9 },
    { name: "Sat", hours: 8.5 },
    { name: "Sun", hours: 8.2 },
  ];

  // Sample data for screen time distribution
  const screenTimeData = [
    { name: "Work", hours: 8.5, color: "#3b82f6" },
    { name: "Entertainment", hours: 3.2, color: "#ef4444" },
    { name: "Social", hours: 2.1, color: "#8b5cf6" },
    { name: "Other", hours: 1.8, color: "#06b6d4" },
  ];

  // New data for additional charts
  const wellnessData = [
    { name: "Excellent", value: 35, color: "#22c55e" },
    { name: "Good", value: 45, color: "#3b82f6" },
    { name: "Needs Attention", value: 20, color: "#facc15" }
  ];

  // Sample data for activity type distribution
  const activityTypeData = [
    { name: "Cardio", value: 28, color: "#ef4444" },
    { name: "Strength", value: 22, color: "#8b5cf6" },
    { name: "Flexibility", value: 15, color: "#06b6d4" },
    { name: "Sports", value: 25, color: "#22c55e" },
    { name: "Others", value: 10, color: "#f59e0b" }
  ];

  // Sample data for daily activity metrics
  const dailyActivityData = [
    { name: "Mon", steps: 8500, calories: 450, active: 65 },
    { name: "Tue", steps: 9200, calories: 520, active: 72 },
    { name: "Wed", steps: 7800, calories: 380, active: 58 },
    { name: "Thu", steps: 10500, calories: 620, active: 85 },
    { name: "Fri", steps: 9100, calories: 480, active: 68 },
    { name: "Sat", steps: 11200, calories: 680, active: 95 },
    { name: "Sun", steps: 10800, calories: 640, active: 92 }
  ];

  // Sample data for stress level distribution
  const stressDistributionData = [
    { name: "Low (1-3)", value: 25, color: "#22c55e" },
    { name: "Moderate (4-6)", value: 40, color: "#facc15" },
    { name: "High (7-8)", value: 22, color: "#f97316" },
    { name: "Very High (9-10)", value: 13, color: "#ef4444" }
  ];

  // Sample data for BMI category distribution
  const bmiCategoryData = [
    { name: "Underweight", value: 8 },
    { name: "Normal", value: 45 },
    { name: "Overweight", value: 32 },
    { name: "Obese", value: 15 }
  ];

  // Sample data for nutrition category distribution
  const nutritionCategoryData = [
    { name: "Balanced Diet", value: 48, color: "#22c55e" },
    { name: "High Carb", value: 22, color: "#3b82f6" },
    { name: "High Fat", value: 18, color: "#ef4444" },
    { name: "Low Calorie", value: 12, color: "#facc15" }
  ];

  // Array defining the tabs for the dashboard sections
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'diet', label: 'Diet & Nutrition', icon: '🥗' },
    { id: 'workout', label: 'Fitness & Workout', icon: '💪' },
    { id: 'sleep', label: 'Sleep Quality', icon: '😴' },
    { id: 'screen', label: 'Screen Time', icon: '📱' },
    { id: 'mental', label: 'Mental Wellness', icon: '🧠' },
  ];

  // Function to render the overview section of the admin dashboard, displaying key metrics and charts
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

      {/* CHARTS GRID - ROW 4: NUTRITION & WORKOUT */}
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

  // Function to render the diet and nutrition section of the dashboard
  const renderDietSection = () => (
    <div className={`space-y-8 ${animated ? 'animate-fade-in' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">🥗 Nutrition Dashboard</h2>
        <p className="text-white/80 text-lg">Track your dietary habits and nutritional goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MEAL COMPLETION */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🍽️</span> Meal Completion Rate
          </h3>
          <div className="space-y-4">
            {dietData.map((meal, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-white/80">{meal.name}</div>
                <div className="flex-1 bg-white/20 rounded-full h-4">
                  <div
                    className="h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${animated ? meal.completed : 0}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-white font-semibold">{meal.completed}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* NUTRITION METRICS */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span> Nutrition Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Calories", value: "2,150", target: "2,200", icon: "🔥" },
              { label: "Protein", value: "125g", target: "130g", icon: "🥩" },
              { label: "Carbs", value: "280g", target: "300g", icon: "🌾" },
              { label: "Fiber", value: "28g", target: "30g", icon: "🥦" }
            ].map((nutrient, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{nutrient.icon}</div>
                <div className="text-white font-semibold">{nutrient.label}</div>
                <div className="text-2xl font-bold text-white">{nutrient.value}</div>
                <div className="text-white/60 text-sm">Target: {nutrient.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Function to render the fitness and workout section of the dashboard
  const renderWorkoutSection = () => (
    <div className={`space-y-8 ${animated ? 'animate-fade-in' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">💪 Fitness Dashboard</h2>
        <p className="text-white/80 text-lg">Monitor your workout progress and fitness goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WORKOUT TYPES */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🏃</span> Weekly Workout Breakdown
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
              <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FITNESS METRICS */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📈</span> Fitness Metrics
          </h3>
          <div className="space-y-4">
            {[
              { label: "Steps Today", value: "8,547", goal: "10,000", icon: "🚶" },
              { label: "Active Minutes", value: "67", goal: "60", icon: "⚡" },
              { label: "Calories Burned", value: "423", goal: "400", icon: "🔥" },
              { label: "Heart Rate", value: "72 bpm", goal: "70 bpm", icon: "❤️" }
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{metric.icon}</span>
                  <div>
                    <div className="text-white font-semibold">{metric.label}</div>
                    <div className="text-white/60 text-sm">Goal: {metric.goal}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Function to render the sleep quality section of the dashboard
  const renderSleepSection = () => (
    <div className={`space-y-8 ${animated ? 'animate-fade-in' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">😴 Sleep Analytics</h2>
        <p className="text-white/80 text-lg">Analyze your sleep patterns and quality</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SLEEP CHART */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🌙</span> Sleep Duration Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sleepData}>
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
              <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SLEEP QUALITY */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">⭐</span> Sleep Quality Metrics
          </h3>
          <div className="space-y-4">
            {[
              { label: "Deep Sleep", value: "2.1h", percentage: 28, color: "bg-purple-500" },
              { label: "REM Sleep", value: "1.8h", percentage: 24, color: "bg-blue-500" },
              { label: "Light Sleep", value: "3.2h", percentage: 43, color: "bg-green-500" },
              { label: "Awake Time", value: "0.3h", percentage: 5, color: "bg-red-500" }
            ].map((stage, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-white/80">{stage.label}</div>
                <div className="flex-1 bg-white/20 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${stage.color} transition-all duration-1000`}
                    style={{ width: `${animated ? stage.percentage : 0}%` }}
                  ></div>
                </div>
                <div className="w-16 text-right text-white font-semibold">{stage.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Function to render the mental wellness section of the dashboard
  const renderMentalSection = () => (
    <div className={`space-y-8 ${animated ? 'animate-fade-in' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">🧠 Mental Health Dashboard</h2>
        <p className="text-white/80 text-lg">Monitor your emotional well-being and stress levels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* STRESS LEVELS PIE */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span> Stress Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stressDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
        </div>

        {/* MENTAL WELLNESS METRICS */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">💭</span> Emotional Metrics
          </h3>
          <div className="space-y-4">
            {[
              { label: "Anxiety", value: 35, color: "bg-red-500", icon: "😰" },
              { label: "Happiness", value: 75, color: "bg-yellow-500", icon: "😊" },
              { label: "Calm", value: 60, color: "bg-green-500", icon: "😌" },
              { label: "Energy", value: 70, color: "bg-blue-500", icon: "⚡" }
            ].map((metric, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl">{metric.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-white/80">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${metric.color} transition-all duration-1000`}
                      style={{ width: `${animated ? metric.value : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WELLNESS CATEGORIES PIE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Overall Wellness Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wellnessData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
        </div>

        {/* MINDFULNESS TIPS */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🧘</span> Wellness Tips
          </h3>
          <div className="space-y-4">
            {[
              { tip: "Practice daily meditation for 10-15 minutes", icon: "🧘" },
              { tip: "Take deep breathing breaks throughout the day", icon: "💨" },
              { tip: "Maintain work-life balance", icon: "⚖️" },
              { tip: "Connect with friends and family regularly", icon: "👥" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-white/80">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Users", value: 120 },
          { title: "Logins", value: 340 },
          { title: "Wellness", value: 78 },
          { title: "Stress", value: 52 }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LINE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="users" stroke="#3b82f6" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Stress Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="count" fill="#ef4444"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Stress Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AREA */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={areaData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="activity" stroke="#8b5cf6" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl mt-6">
        <h3 className="font-semibold mb-2">🤖 AI Insights</h3>
        <ul className="text-sm space-y-1">
          <li>📈 Screen time increasing</li>
          <li>😴 Sleep decreasing</li>
          <li>💪 Activity improving</li>
        </ul>
      </div>

    </div>
  );
}

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Users", value: 120 },
          { title: "Logins", value: 340 },
          { title: "Wellness", value: 78 },
          { title: "Stress", value: 52 }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LINE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="users" stroke="#3b82f6" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Stress Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="count" fill="#ef4444"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Stress Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AREA */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="mb-3 font-semibold">Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={areaData}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="activity" stroke="#8b5cf6" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl mt-6">
        <h3 className="font-semibold mb-2">🤖 AI Insights</h3>
        <ul className="text-sm space-y-1">
          <li>📈 Screen time increasing</li>
          <li>😴 Sleep decreasing</li>
          <li>💪 Activity improving</li>
        </ul>
      </div>

    </div>
  );
}