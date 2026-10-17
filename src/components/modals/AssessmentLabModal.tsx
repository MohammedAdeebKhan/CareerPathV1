import React, { useState } from 'react';

interface AssessmentLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuery: () => void;
  queriesPassed: number;
}

export const AssessmentLabModal: React.FC<AssessmentLabModalProps> = ({
  isOpen,
  onClose,
  onCompleteQuery,
  queriesPassed,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'schema' | 'instructions'>('editor');
  const [queryCode, setQueryCode] = useState<string>(
    `SELECT \n  order_id,\n  customer_id,\n  order_date,\n  amount,\n  SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total\nFROM orders\nORDER BY customer_id, order_date;`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [outputRows, setOutputRows] = useState<any[]>([]);

  if (!isOpen) return null;

  const mockOrders = [
    { order_id: 101, customer_id: 'CUST-01', order_date: '2026-08-01', amount: 140.0, running_total: 140.0 },
    { order_id: 104, customer_id: 'CUST-01', order_date: '2026-08-15', amount: 260.0, running_total: 400.0 },
    { order_id: 108, customer_id: 'CUST-01', order_date: '2026-09-02', amount: 95.0, running_total: 495.0 },
    { order_id: 102, customer_id: 'CUST-02', order_date: '2026-08-05', amount: 310.0, running_total: 310.0 },
    { order_id: 106, customer_id: 'CUST-02', order_date: '2026-08-22', amount: 190.0, running_total: 500.0 },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      // Validate query syntax
      const normalized = queryCode.toLowerCase();
      const passed =
        normalized.includes('sum(amount)') &&
        normalized.includes('partition by customer_id') &&
        normalized.includes('order by order_date');

      setIsSuccess(passed);
      setOutputRows(mockOrders);
    }, 400);
  };

  const handleSubmit = () => {
    if (isSuccess) {
      onCompleteQuery();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#eff4ff]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-b border-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004ac6] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-[15px] font-bold text-[#0b1c30]">
                  Practice Lab: PostgreSQL Analytics
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#004ac6]">
                  SQL Module 4
                </span>
              </div>
              <p className="text-[12px] text-[#434655]">
                Checkpoint 4: Cumulative Running Revenue per Customer
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#eff4ff] flex items-center justify-center text-[#434655] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Workspace Toolbar */}
        <div className="px-6 py-2.5 bg-white border-b border-[#eff4ff] flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'editor'
                  ? 'bg-[#e5eeff] text-[#004ac6] font-semibold'
                  : 'text-[#434655] hover:bg-[#f8f9ff]'
              }`}
            >
              SQL Query Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'schema'
                  ? 'bg-[#e5eeff] text-[#004ac6] font-semibold'
                  : 'text-[#434655] hover:bg-[#f8f9ff]'
              }`}
            >
              Schema &amp; Tables
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('instructions')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'instructions'
                  ? 'bg-[#e5eeff] text-[#004ac6] font-semibold'
                  : 'text-[#434655] hover:bg-[#f8f9ff]'
              }`}
            >
              Problem Spec
            </button>
          </div>
          <div className="text-[12px] text-[#434655] flex items-center gap-2">
            <span>Progress:</span>
            <span className="font-semibold text-[#006c49]">
              {queriesPassed} of 5 queries passed
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#eff4ff] rounded-xl text-[13px] text-[#0b1c30] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#004ac6] text-[18px] shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <strong>Task:</strong> Use the <code className="bg-white px-1.5 py-0.5 rounded text-[#004ac6] font-mono text-xs">SUM() OVER()</code> window function to calculate the running total of <code className="bg-white px-1.5 py-0.5 rounded text-[#004ac6] font-mono text-xs">amount</code> partitioned by <code className="bg-white px-1.5 py-0.5 rounded text-[#004ac6] font-mono text-xs">customer_id</code> and ordered chronologically by <code className="bg-white px-1.5 py-0.5 rounded text-[#004ac6] font-mono text-xs">order_date</code>.
                </div>
              </div>

              {/* Code Area */}
              <div className="relative border border-[#d3e4fe] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-[#004ac6] transition-all">
                <div className="bg-[#1e293b] text-slate-300 px-4 py-2 text-[11px] font-mono flex items-center justify-between">
                  <span>postgres_db::query_editor.sql</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQueryCode(
                        `SELECT \n  order_id,\n  customer_id,\n  order_date,\n  amount,\n  SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total\nFROM orders\nORDER BY customer_id, order_date;`
                      )
                    }
                    className="text-xs text-[#b4c5ff] hover:text-white"
                  >
                    Reset Solution
                  </button>
                </div>
                <textarea
                  value={queryCode}
                  onChange={(e) => setQueryCode(e.target.value)}
                  rows={6}
                  className="w-full bg-[#0b1c30] text-emerald-300 font-mono text-[13px] p-4 focus:outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isRunning ? 'sync' : 'play_arrow'}
                  </span>
                  <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
                </button>

                {hasRun && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-5 py-2.5 bg-[#006c49] hover:bg-[#10b981] text-white font-headline text-[13px] font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Submit &amp; Mark Query Passed</span>
                  </button>
                )}
              </div>

              {/* Result Preview */}
              {hasRun && (
                <div className="mt-4 p-4 rounded-2xl bg-[#f8f9ff] border border-[#eff4ff] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px]">
                      {isSuccess ? (
                        <span className="inline-flex items-center gap-1 text-[#006c49] font-semibold">
                          <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          Tests Passed: Window partition matches expected schema!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#ba1a1a] font-semibold">
                          <span className="material-symbols-outlined text-[18px]">error</span>
                          Query missing PARTITION BY customer_id or ORDER BY order_date
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#434655] font-mono">
                      Query Runtime: 24ms
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#eff4ff] bg-white">
                    <table className="w-full text-left text-[12px] font-mono">
                      <thead className="bg-[#eff4ff] text-[#0b1c30]">
                        <tr>
                          <th className="p-2.5">order_id</th>
                          <th className="p-2.5">customer_id</th>
                          <th className="p-2.5">order_date</th>
                          <th className="p-2.5">amount ($)</th>
                          <th className="p-2.5 text-[#006c49]">running_total ($)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eff4ff]">
                        {outputRows.map((row) => (
                          <tr key={row.order_id} className="hover:bg-[#f8f9ff]">
                            <td className="p-2.5 text-[#434655]">{row.order_id}</td>
                            <td className="p-2.5 font-semibold text-[#0b1c30]">{row.customer_id}</td>
                            <td className="p-2.5 text-[#434655]">{row.order_date}</td>
                            <td className="p-2.5 text-[#0b1c30]">${row.amount.toFixed(2)}</td>
                            <td className="p-2.5 font-bold text-[#006c49]">
                              ${row.running_total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4 text-[13px]">
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#eff4ff]">
                <h4 className="font-headline font-semibold text-[#0b1c30] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004ac6] text-[18px]">table_chart</span>
                  Table: <code className="text-[#004ac6]">orders</code>
                </h4>
                <ul className="space-y-1 text-[#434655] font-mono text-xs">
                  <li>• <strong className="text-[#0b1c30]">order_id</strong> (INT, Primary Key)</li>
                  <li>• <strong className="text-[#0b1c30]">customer_id</strong> (VARCHAR(32), Foreign Key)</li>
                  <li>• <strong className="text-[#0b1c30]">order_date</strong> (DATE)</li>
                  <li>• <strong className="text-[#0b1c30]">amount</strong> (DECIMAL(10,2))</li>
                  <li>• <strong className="text-[#0b1c30]">payment_status</strong> (VARCHAR(16))</li>
                </ul>
              </div>
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#eff4ff]">
                <h4 className="font-headline font-semibold text-[#0b1c30] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#004ac6] text-[18px]">table_chart</span>
                  Table: <code className="text-[#004ac6]">customers</code>
                </h4>
                <ul className="space-y-1 text-[#434655] font-mono text-xs">
                  <li>• <strong className="text-[#0b1c30]">customer_id</strong> (VARCHAR(32), Primary Key)</li>
                  <li>• <strong className="text-[#0b1c30]">customer_name</strong> (VARCHAR(100))</li>
                  <li>• <strong className="text-[#0b1c30]">segment</strong> (Enterprise | Mid-Market | SMB)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-3 text-[13px] text-[#434655]">
              <h4 className="font-headline font-bold text-[#0b1c30] text-[15px]">
                Concept Breakdown: Window Functions in SQL
              </h4>
              <p>
                Unlike standard aggregate functions with <code className="font-mono text-xs bg-[#eff4ff] px-1 py-0.5 rounded">GROUP BY</code>, window functions do not collapse rows together. Instead, they produce a calculation across a set of table rows that are related to the current row.
              </p>
              <div className="p-3 bg-[#eff4ff] rounded-xl text-xs space-y-1">
                <div className="font-semibold text-[#004ac6]">Syntax Pattern:</div>
                <code className="font-mono text-[#0b1c30] block">
                  FUNCTION() OVER (PARTITION BY [grouping_column] ORDER BY [sort_column])
                </code>
              </div>
              <p>
                This pattern is tested in 80%+ of Junior Data Analyst screenings at companies like Stripe, Robinhood, and Spotify.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
