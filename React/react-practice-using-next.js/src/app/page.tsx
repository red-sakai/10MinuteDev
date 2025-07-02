import Image from "next/image";

export default function Home() {
  // it is common and recommended that the html and js dedicated code is to be inside one script file
  // in order to see everything in one place and also standard react practice
  const name = "Jhered";
  const age = 19;

  return (
    <div className="wholetext">
      <h1 className="h1text">Hello World!</h1>
      <h2 className="h2text">My name is {name}, and as of making this I am {age} years old!</h2>
      <p className="ptext"><br></br><br></br><br></br><br></br>The sole purpose of making this was in order for me to practice react with next.js
        framework, two birds one stone. <br></br>With a bit of knowledge from our LogistIQ project, I 
        was able to learn a bit of javascript and <br></br>I will now be using that to learn react with
        next.js framework.
      </p>
    </div>
  );
}
