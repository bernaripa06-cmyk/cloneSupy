/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Truck, 
  Phone, 
  Mail, 
  ExternalLink, 
  Plus, 
  Search,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';

const suppliers = [
  { id: '1', name: 'Metro Cash & Carry', category: 'Général', rating: 4.8, contact: 'Marc L.', phone: '01 45 67 89 00', email: 'service@metro.fr' },
  { id: '2', name: 'Bridor France', category: 'Boulangerie', rating: 4.5, contact: 'Sophie T.', phone: '02 99 00 11 22', email: 'orders@bridor.com' },
  { id: '3', name: 'Rungis Viandes', category: 'Boucherie', rating: 4.9, contact: 'Jean R.', phone: '01 46 87 00 11', email: 'jean@rungisviandes.fr' },
];

export default function Suppliers() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fournisseurs</h1>
          <p className="text-slate-500 mt-1">Gérez vos partenaires et leurs catalogues de produits.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
          <Plus size={16} />
          Ajouter un fournisseur
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un fournisseur..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Truck size={24} />
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-600 font-bold text-xs">
                  ★ {s.rating}
                </div>
              </div>
              
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{s.name}</h3>
              <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-600 mb-6 inline-block">
                {s.category}
              </span>

              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm font-medium">{s.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm font-medium truncate">{s.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 flex-shrink-0">
                    <Clock size={14} />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 italic">Livraison en 24h</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Catalogue <ExternalLink size={12} />
              </button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-700">Contacter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
