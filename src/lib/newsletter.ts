import { DailyBrief } from "./briefComposer";

interface NewsletterInput {
  brief: DailyBrief;
  date: string;
}

export function generateNewsletter({
  brief,
  date,
}: NewsletterInput): string {

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<style>

body{
background:#0d1117;
color:#ffffff;
font-family:Arial,sans-serif;
padding:40px;
line-height:1.7;
}

.container{
max-width:700px;
margin:auto;
background:#161b22;
padding:40px;
border-radius:16px;
}

h1{
margin-bottom:5px;
}

.small{
color:#8b949e;
}

.card{
background:#0d1117;
padding:20px;
margin:20px 0;
border-radius:12px;
}

ul{
padding-left:18px;
}

a{
color:#58a6ff;
text-decoration:none;
}

.footer{
margin-top:40px;
font-size:13px;
color:#8b949e;
}

</style>

</head>

<body>

<div class="container">

<h1>BlockBrief</h1>

<div class="small">

${date}

</div>

<div class="card">

<h2>${brief.headline}</h2>

<p>

${brief.summary}

</p>

</div>

<div class="card">

<h3>Today's Key Points</h3>

<ul>

${brief.keyPoints
.map(point => `<li>${point}</li>`)
.join("")}

</ul>

</div>

<div class="footer">

Read online at BlockBrief

</div>

</div>

</body>

</html>
`;
}