/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency } from '../lib/utils';

const data = [
  { name: 'Lun', cost: 4000, revenue: 5400 },
  { name: 'Mar', cost: 3000, revenue: 4800 },
  { name: 'Mer', cost: 2000, revenue: 3900 },
  { name: 'Jeu', cost: 2780, revenue: 4200 },
  { name: 'Ven', cost: 1890, revenue: 3200 },
  { name: 'Sam', cost: 2390, revenue: 5100 },
  { name: 'Dim', cost: 3490, revenue: 6200 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={cn("flex items-center gap-1 text-sm font-medium", trend === 'up' ? 'text-emerald-600' : 'text-rose-600')}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

import { cn } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 translate-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
          <p className="text-slate-500 mt-1">Aperçu de la performance de votre cuisine aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Exporter</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors">Nouvelle Commande</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Food Cost Global" 
          value="24.8%" 
          change="-2.1%" 
          trend="down" 
          icon={TrendingDown} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="Valeur de l'Inventaire" 
          value={formatCurrency(12450)} 
          change="+4.5%" 
          trend="up" 
          icon={DollarSign} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Ruptures de Stock" 
          value="7 articles" 
          change="+2" 
          trend="up" 
          icon={AlertCircle} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Consommation Hebdo" 
          value={formatCurrency(8430)} 
          change="+12%" 
          trend="up" 
          icon={TrendingUp} 
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Revenus vs Food Cost</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-medium py-1 px-3 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10}  tickFormatter={(value) => `${value}€`} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontWeight: '600'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6">Alertes de Stock</h3>
          <div className="space-y-4 flex-1">
            {[
              { name: 'Filet de Bœuf', status: 'Rupture', level: '0kg / 20kg', color: 'text-red-600', bg: 'bg-red-50' },
              { name: 'Huile d’Olive', status: 'Bas', level: '2L / 50L', color: 'text-amber-600', bg: 'bg-amber-50' },
              { name: 'Saumon Frais', status: 'Rupture', level: '0.4kg / 10kg', color: 'text-red-600', bg: 'bg-red-50' },
              { name: 'Farine T55', status: 'Bas', level: '5kg / 100kg', color: 'text-amber-600', bg: 'bg-amber-50' },
              { name: 'Œufs Bio', status: 'Bas', level: '12 / 120', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{item.level}</p>
                </div>
                <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", item.bg, item.color)}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Voir tout l'inventaire</button>
        </div>
      </div>
    </div>
  );
}
