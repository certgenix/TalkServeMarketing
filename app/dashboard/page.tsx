'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiTrendingUp, FiClock, FiCalendar, FiArrowUp, FiArrowDown } from 'react-icons/fi';

type TimePeriod = 'day' | 'week' | 'month';

const dummyData = {
  day: {
    totalChats: 127,
    change: 12.5,
    peakHour: '2:00 PM - 3:00 PM',
    peakDay: 'Today',
    hourlyData: [4, 8, 12, 18, 25, 32, 45, 52, 48, 42, 38, 35, 48, 56, 62, 58, 45, 38, 28, 22, 18, 12, 8, 5],
  },
  week: {
    totalChats: 842,
    change: 8.3,
    peakHour: '2:00 PM - 4:00 PM',
    peakDay: 'Wednesday',
    dailyData: [98, 112, 145, 156, 132, 108, 91],
  },
  month: {
    totalChats: 3456,
    change: 15.7,
    peakHour: '1:00 PM - 3:00 PM',
    peakDay: 'Wednesday',
    weeklyData: [756, 823, 892, 985],
  },
};

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const hourLabels = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? 'AM' : 'PM';
  return `${hour}${ampm}`;
});

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const [isChartReady, setIsChartReady] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const data = dummyData[timePeriod];

  useEffect(() => {
    setIsChartReady(false);
    const timer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [timePeriod]);

  const getChartData = () => {
    switch (timePeriod) {
      case 'day':
        return { data: dummyData.day.hourlyData, labels: hourLabels };
      case 'week':
        return { data: dummyData.week.dailyData, labels: dayLabels };
      case 'month':
        return { data: dummyData.month.weeklyData, labels: weekLabels };
    }
  };

  const chartInfo = getChartData();
  const maxValue = Math.max(...chartInfo.data);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Conversation Volume Insights
          </p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm">
          {(['day', 'week', 'month'] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timePeriod === period
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <FiMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`flex items-center gap-1 text-sm font-medium ${
              data.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {data.change >= 0 ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
              {Math.abs(data.change)}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            {data.totalChats.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total Chats ({timePeriod === 'day' ? 'Today' : timePeriod === 'week' ? 'This Week' : 'This Month'})
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {data.peakHour}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Peak Hours for Messaging
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <FiCalendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {data.peakDay}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Peak Day of the Week
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            +{data.change}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Growth Trend ({timePeriod === 'day' ? 'vs Yesterday' : timePeriod === 'week' ? 'Week-over-Week' : 'Month-over-Month'})
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Conversation Volume
        </h2>
        
        <div ref={chartRef} className="h-64 sm:h-80 relative">
          <div className="absolute inset-0 flex gap-1 sm:gap-2 items-end pb-8">
            {chartInfo.data.map((value, index) => {
              const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg cursor-pointer relative group min-w-[4px] sm:min-w-[8px] transition-all duration-500 hover:from-blue-700 hover:to-blue-500`}
                    style={{ 
                      height: isChartReady ? `${heightPercent}%` : '0%',
                      minHeight: isChartReady && value > 0 ? '4px' : '0px'
                    }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {value} chats
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex gap-1 sm:gap-2">
            {chartInfo.labels.map((label, index) => {
              const showLabel = timePeriod === 'day' 
                ? index % 4 === 0 
                : true;
              return (
                <div key={index} className="flex-1 text-center">
                  <span className={`text-xs text-gray-500 dark:text-gray-400 ${showLabel ? 'block' : 'hidden sm:block'}`}>
                    {timePeriod === 'day' && !showLabel ? '' : label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hourly Distribution
          </h2>
          <div className="space-y-3">
            {[
              { time: '9 AM - 12 PM', percentage: 25, label: 'Morning' },
              { time: '12 PM - 3 PM', percentage: 35, label: 'Afternoon Peak' },
              { time: '3 PM - 6 PM', percentage: 28, label: 'Late Afternoon' },
              { time: '6 PM - 9 PM', percentage: 12, label: 'Evening' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.time}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Performance
          </h2>
          <div className="space-y-3">
            {dayLabels.map((day, index) => {
              const values = [78, 85, 92, 88, 82, 65, 58];
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-12 text-sm text-gray-600 dark:text-gray-400">{day}</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 2 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      style={{ width: `${values[index]}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">
                    {values[index]}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
