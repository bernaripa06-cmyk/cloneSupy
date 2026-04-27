/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Package, 
  AlertTriangle,
  ArrowUpDown,
  Download,
  Trash2,
  Edit2
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Ingredient, Unit } from '../types';

const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: '1', name: 'Filet de Bœuf', unit: 'kg', currentStock: 0, minStock: 20, averagePrice: 28.50, lastPurchasedPrice: 29.90, category: 'Viandes' },
  { id: '2', name: 'Huile d’Olive', unit: 'l', currentStock: 2, minStock: 50, averagePrice: 12.00, lastPurchasedPrice: 13.50, category: 'Epicerie' },
  { id: '3', name: 'Farine T55', unit: 'kg', currentStock: 5, minStock: 100, averagePrice: 0.85, lastPurchasedPrice: 0.80, category: 'Epicerie' },
  { id: '4', name: 'Sel Fin', unit: 'kg', currentStock: 45, minStock: 10, averagePrice: 0.45, lastPurchasedPrice: 0.45, category: 'Epicerie' },
  { id: '5', name: 'Saumon Frais', unit: 'kg', currentStock: 0.4, minStock: 10, averagePrice: 22.00, lastPurchasedPrice: 24.50, category: 'Poissonnerie' },
  { id: '6', name: 'Lait Entier', unit: 'l', currentStock: 80, minStock: 30, averagePrice: 1.10, lastPurchasedPrice: 1.10, category: 'Crèmerie' },
];

export default function Inventory() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ing.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventaire</h1>
          <p className="text-slate-500 mt-1">Gérez vos stocks, catégories et alertes de réapprovisionnement.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Download size={16} />
            Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
            <Plus size={16} />
            Ajouter un produit
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou catégorie..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
            <Filter size={16} />
            Catégories
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
            <ArrowUpDown size={16} />
            Trier par stock
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Produit</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Actuel</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Seuil Min.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prix Moyen</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valeur Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredIngredients.map((ing) => {
              const isLowStock = ing.currentStock <= ing.minStock;
              const isCritical = ing.currentStock === 0;

              return (
                <tr key={ing.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isCritical ? "bg-red-50 text-red-600" : isLowStock ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                      )}>
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{ing.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{ing.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-600">{ing.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-bold",
                        isCritical ? "text-red-600" : isLowStock ? "text-amber-600" : "text-slate-900"
                      )}>
                        {ing.currentStock} {ing.unit}
                      </span>
                      {(isLowStock || isCritical) && (
                        <AlertTriangle size={14} className={isCritical ? "text-red-500" : "text-amber-500"} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    {ing.minStock} {ing.unit}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {formatCurrency(ing.averagePrice)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(ing.currentStock * ing.averagePrice)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredIngredients.length === 0 && (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">Aucun ingrédient trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
