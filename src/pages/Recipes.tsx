/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChefHat, 
  DollarSign, 
  TrendingDown, 
  TrendingUp,
  Percent,
  ChevronRight,
  Clock,
  Users
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Recipe } from '../types';

const INITIAL_RECIPES: Recipe[] = [
  { 
    id: '1', 
    name: 'Steak Frites Béarnaise', 
    category: 'Plats', 
    sellingPrice: 24.00, 
    yield: 1, 
    ingredients: [
      { ingredientId: '1', quantity: 0.25, unit: 'kg' }, // Filet de boeuf
      { ingredientId: '3', quantity: 0.2, unit: 'kg' }, // Pommes de terre (mocking with flour)
    ] 
  },
  { 
    id: '2', 
    name: 'Saumon Unilatéral', 
    category: 'Plats', 
    sellingPrice: 19.50, 
    yield: 1, 
    ingredients: [
      { ingredientId: '5', quantity: 0.18, unit: 'kg' }, // Saumon
    ] 
  },
];

// Mock prices for costing
const MOCK_PRICES: Record<string, number> = {
  '1': 28.50,
  '3': 0.85,
  '5': 22.00,
};

export default function Recipes() {
  const [recipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');

  const calculateFoodCost = (recipe: Recipe) => {
    return recipe.ingredients.reduce((acc, current) => {
      const price = MOCK_PRICES[current.ingredientId] || 0;
      return acc + (price * current.quantity);
    }, 0);
  };

  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fiches Techniques</h1>
          <p className="text-slate-500 mt-1">Gérez vos recettes et optimisez votre food cost.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
          <Plus size={16} />
          Créer une recette
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <TrendingDown size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase">Top Marge</span>
          </div>
          <p className="text-slate-600 text-sm font-medium">Food Cost Moyen</p>
          <p className="text-2xl font-bold text-emerald-700">22.4%</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
              <ChefHat size={20} />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase">Catalogue</span>
          </div>
          <p className="text-slate-600 text-sm font-medium">Recettes Actives</p>
          <p className="text-2xl font-bold text-blue-700">{recipes.length}</p>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-bold text-rose-700 uppercase">Alerte Marge</span>
          </div>
          <p className="text-slate-600 text-sm font-medium">Recettes Critique (&gt;35%)</p>
          <p className="text-2xl font-bold text-rose-700">2</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher une recette par nom ou ingrédient..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="bg-slate-100 text-slate-700 border-none rounded-lg text-sm font-semibold py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none">
          <option>Toutes les catégories</option>
          <option>Entrées</option>
          <option>Plats</option>
          <option>Desserts</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecipes.map((recipe) => {
          const cost = calculateFoodCost(recipe);
          const margin = recipe.sellingPrice - cost;
          const costPercentage = (cost / recipe.sellingPrice) * 100;
          const isHighCost = costPercentage > 30;

          return (
            <div key={recipe.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                      <ChefHat size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors uppercase tracking-tight">{recipe.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          <Users size={12} /> {recipe.yield} convive(s)
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          <Clock size={12} /> 25 min
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Prix de Vente</p>
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(recipe.sellingPrice)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Coût Ingrédients</p>
                    <p className={cn("text-lg font-bold", isHighCost ? "text-rose-600" : "text-emerald-600")}>
                      {formatCurrency(cost)}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Marge Brut</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(margin)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>Performance Food Cost</span>
                    <span className={cn(isHighCost ? "text-rose-600" : "text-emerald-600")}>
                      {costPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000 ease-out", isHighCost ? "bg-rose-500" : "bg-emerald-500")}
                      style={{ width: `${costPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
