<h2>Node with Typescript (MVC)</h2> 
<h3><b>Tech Stack</b></h3>
<ul>
  <li>Node.js (Backend framework)</li>
  <li>Express.js(used for routing)</li>
  <li>typescript</li>
  <li>mongo db (used <code>mongoose</code> driver to connect mongo from node)</li>
</ul>
<h3>To run poject</h3>
<ol>
  <li><code>git clone <a><i>https://github.com/raghudevbytes/node-typescript-beginner-practice.git</i></a></code></code></li>
<li><code>npm install</code></li>
<li><code>npx tsc</code></li>
<li><code>node app.js</code></li>
</ol>
<h3>Endpoints</h3>
<ol>
  <li><b>GET</b> http://localhost:8080/api/fruits</li>
  <li><b>GET</b> http://localhost:8080/api/fruits/:id</li>
   <li><b>POST</b> http://localhost:8080/api/fruits</li>
  <li><b>PUT</b> http://localhost:8080/api/fruits/:id</li>
  <li><b>DELETE</b> http://localhost:8080/api/fruits/:id</li>
</ol>
<h3>sample request body :</h3>
<code>
   {
    "name": "orange",
    "taste": "sweet",
    "season": "winter",
    "rating": 4
  }
</code>
