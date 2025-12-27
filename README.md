<h1>Google-Docs-Clone</h1>

<p>
  A real-time collaborative document editor inspired by Google Docs, built using
  <b>Next.js</b>, <b>Clerk authentication</b>, and <b>Convex</b> for backend state management.
  The application enables seamless multi-user editing with low-latency sync,
  live presence, comments, and role-based access control.
</p>

<hr/>

<h2>✨ Features</h2>
<ul>
  <li>🧑‍🤝‍🧑 <b>Real-time multi-user editing</b></li>
  <li>🟢 <b>Live presence</b> & cursor tracking</li>
  <li>🔐 <b>Role-based access control</b> (viewer / editor)</li>
  <li>🧵 <b>Inline comments</b> & discussion threads</li>
  <li>💾 <b>Automatic persistence</b> with autosave</li>
  <li>🖊️ <b>Rich text editing</b> using Tiptap</li>
  <li>📱 Responsive UI for desktop & tablet</li>
</ul>

<hr/>

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>Next.js (App Router)</li>
  <li>React</li>
  <li>TypeScript</li>
  <li>Tailwind CSS</li>
  <li>Tiptap (rich-text editor)</li>
</ul>

<h3>Authentication</h3>
<ul>
  <li>Clerk (user authentication & session management)</li>
</ul>

<h3>Backend / Database</h3>
<ul>
  <li>Convex (real-time database, serverless functions)</li>
</ul>

<hr/>

<h2>🧠 Architecture Overview</h2>

<pre>
Client (Next.js + React + Tiptap)
        |
        v
Clerk (Auth & Session)
        |
        v
Convex (Realtime DB + Mutations + Queries)
</pre>

<p>
  Convex handles real-time state synchronization and persistence, enabling
  conflict-safe collaboration and instant updates across concurrent users.
</p>

<hr/>

<h2>📸 Screenshots / Demo</h2>
<ul>
  <li>Still developing...</li>
</ul>

<hr/>

<h2>🚀 Local Setup</h2>

<pre>
# Clone repository
git clone https://github.com/AtharvaLole/&lt;repo-name&gt;.git

# Install dependencies
npm install

# Run Convex locally
npx convex dev

# Start development server
npm run dev
</pre>

<p>
  <b>Note:</b> Environment variables for Clerk and Convex are required.
</p>

<hr/>

<h2>🧪 Key Engineering Highlights</h2>
<ul>
  <li>Real-time collaboration powered by Convex queries and mutations</li>
  <li>Clean separation between editor UI and backend state logic</li>
  <li>Document-level access control using Clerk user sessions</li>
  <li>Optimized rendering for frequent updates and large documents</li>
</ul>

<hr/>

<h2>🗺️ Future Enhancements</h2>
<ul>
  <li>🕒 Version history & rollback</li>
  <li>📴 Offline editing support</li>
  <li>🔗 Secure document sharing via links</li>
  <li>📄 Export to PDF / DOCX</li>
</ul>

<hr/>

<h2>👤 Author</h2>
<p>
  <b>Atharva Lole</b><br/>
  Frontend & AI Engineer<br/>
  <a href="https://github.com/AtharvaLole" target="_blank">GitHub</a>
</p>

<hr/>

<h2>⭐ Why this project stands out</h2>
<p>
  This project demonstrates production-grade real-time collaboration, modern
  frontend architecture with Next.js, and scalable backend design using Convex —
  skills highly relevant to SaaS and product engineering roles.
</p>
