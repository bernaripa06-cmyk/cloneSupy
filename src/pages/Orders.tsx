/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

const orders = [
  { id: 'ORD-2023-001', supplier: 'Metro Cash & Carry', date: '25/04/2026', total: 1250.40, status: 'received' },
  { id: 'ORD-2023-002', supplier: 'Rungis Viandes', date: '26/04/2026', total: 840.00, status: 'pending' },
  { id: 'ORD-2023-003', supplier: 'Bridor France', date: '27/04/2026', total: 156.20, status: 'draft' },
];

const statusStyles: any = {
  received: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle2, label: 'Reçu' },
  pending: { bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock, label: 'En attente' },
  draft: { bg: 'bg-slate-100', text: 'text-slate-600', icon: FileText, label: 'Brouillon' },
  cancelled: { bg: 'bg-rose-50', text: 'text-rose-600', icon: XCircle, label: 'Annulé' },
};

export default function Orders() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-slate-500 mt-1">Suivez vos commandes en cours et historique d'achats.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
          <Plus size={16} />
          Nouvelle Commande
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par numéro ou fournisseur..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors pointer-events-none opacity-50">
            <Calendar size={16} />
            Mois dernier
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">N° Commande</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fournisseur</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((ord) => {
              const status = statusStyles[ord.status];
              const StatusIcon = status.icon;

              return (
                <tr key={ord.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold text-slate-900">{ord.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-sm">{ord.supplier}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{ord.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(ord.total)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider", status.bg, status.text)}>
                      <StatusIcon size={14} />
                      {status.label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="text-xs font-bold text-slate-500 hover:text-slate-700">Imprimer PDF</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
