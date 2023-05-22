import React from "react"



  function Intro(props) {

    function handleCategoryChange(event) {
      const selectedCategory = event.target.value;
      props.setSelectedCategory(selectedCategory);
    }
  
      return (
        
        <section className="introSection" id="intro" >
        <div className="introInfodiv" >
            <h1>Quizzify</h1>
            <h3>Quiz Quest Begins!</h3> 
              
        </div>
    <form id="form">
    
    <select name="schemes" id="schemes" onChange={handleCategoryChange}>
    <option value="" >Any Category</option>
    <option value="9">General Knowledge</option>
    <option value="10">Entertainment: Books</option>
    <option value="11">Entertainment: Film</option>
    <option value="12">Entertainment: Music</option>
    <option value="13">Entertainment: Musicals & Theatres</option>
    <option value="14">Entertainment: Television</option>
    <option value="15">Entertainment: Video Games </option>
    <option value="16">Entertainment: Board Games</option>
    <option value="17">Science & Nature</option>
    <option value="18">Science: Computers</option>
    <option value="19">Science: Mathematics</option>
    <option value="20">Mythology</option>
    <option value="21">Sports</option>
    <option value="22">Geography</option>
    <option value="23">History</option>
    <option value="24">Politics</option>
    <option value="25">Art</option>
    <option value="26">Celebrities</option>
    <option value="28">Vehicles</option>
    <option value="29">Entertainment: Comics</option>
    <option value="30">Science: Gadgets </option>
    <option value="31">Entertainment: Japanese Anime & Manga</option>
    </select>
   
    </form>


        
        <div className="startBtndiv" >
            <button className="startBtn" onClick={props.introDisplayNone}  >Start quiz</button>
        </div>


        </section>


      )

}

export default Intro