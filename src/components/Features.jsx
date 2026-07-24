function Features(){

const features=[

{
title:"AI Idea Analysis",
text:"Analyze your product idea and discover opportunities."
},

{
title:"Feature Planning",
text:"Generate MVP features and product requirements."
},

{
title:"UI/UX Suggestions",
text:"Get AI generated interface recommendations."
},

{
title:"Technology Advisor",
text:"Choose the right technology stack."
},

{
title:"Development Roadmap",
text:"Create a step-by-step development plan."
},

{
title:"AI Product Assistant",
text:"Chat with your AI product strategist."
}

];


return(

<section className="features" id="features">

<div className="section-header">
<h2>
Powerful AI Product Tools
</h2>
</div>

<div className="feature-grid">


{
features.map((item,index)=>(

<div className="feature-card" key={index}>

<h3>
{item.title}
</h3>

<p>
{item.text}
</p>

</div>

))
}


</div>



</section>


)


}


export default Features;