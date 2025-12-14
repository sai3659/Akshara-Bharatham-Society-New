import React from 'react';
import { Section, Card, Button, DecorativeShapes } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', donations: 4000, volunteers: 24 },
  { name: 'Feb', donations: 3000, volunteers: 13 },
  { name: 'Mar', donations: 2000, volunteers: 58 },
  { name: 'Apr', donations: 2780, volunteers: 39 },
  { name: 'May', donations: 1890, volunteers: 48 },
  { name: 'Jun', donations: 2390, volunteers: 38 },
];

const Admin: React.FC = () => {
  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">Admin Dashboard</h1>
          <Button size="sm" variant="outline">Export Data</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Donation Trends</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="#9C4DFF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Volunteer Signups</h3>
             <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="volunteers" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Developer Notes for Integrations */}
        <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-500 mb-4">Developer Integration Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-700 dark:text-yellow-400">
            <li><strong>Booking Webhook:</strong> `POST` request to `https://corn-routes-connectors-birmingham.trycloudflare.com/webhook/ngo-booking` implemented in `services/api.ts`.</li>
            <li><strong>Automation (n8n):</strong> Create a workflow that listens to the webhook → Parses JSON body → Adds event to Google Calendar → Sends email via SMTP/Gmail node → Adds row to Google Sheets.</li>
            <li><strong>Volunteer Matching:</strong> Use n8n to route volunteer applications based on selected "Skills" to specific program manager emails.</li>
            <li><strong>Security:</strong> This Admin route is currently public for demo. In production, wrap with AuthGuard component.</li>
          </ul>
        </Card>
      </Section>
    </>
  );
};

export default Admin;