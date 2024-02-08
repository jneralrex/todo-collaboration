$(document).ready(function(){
    function validateMe() {
        let agreedBox = document.getElementById("agreedBox");
        let strikethrough = document.getElementById("strikeThrough");
        let strikeThroughSecond = document.getElementById("strikeThroughSecond")
       

        if (agreedBox.checked == true){
            strikethrough.style.textDecoration = "line-through"  
        }

        else { strikethrough.style.textDecoration = "none"}

        if (agreedBox.checked == true){
            strikeThroughSecond.style.textDecoration ="line-through"
            
        }

        else {strikeThroughSecond.style.textDecoration = "none"}
    }
    $("#agreedBox").click(function(){
        validateMe()
    });

    $("#todoBold").click(function(){
        let todoWord = document.getElementById("todoWord")
        let todoBold = document.getElementById("todoBold")
     
    })

     $("#taskHider").click(function () {
    $("#taskHolder").toggle();
  });

  $(".create-category-btn").click(function () {
    $(".categoryModal").show();
  });

  $(".cancel-category-btn").click(function (event) {
    event.preventDefault();

    $(".categoryModal").hide();

    taskForm.trigger("reset");
  });

  $(".task-adder").click(function () {
    $(".modal").show();
  });

  const categoryCreatingForm = $("#categoryCreatingForm");

  $(".add-category-btn").click(function (event) {
    event.preventDefault();

    const categorySection = $(".categorySection");

    const categoryTitle = $("#categoryTitle").val();

    const categoryPinner = $(`<div class="category-display-board"></div>`);

    categoryPinner.html(`
    <p class="category-name">${categoryTitle}</p>`);

    categorySection.append(categoryPinner);

    const categorySectionTwo = $(".categorySectionTwo");

    const categoryPinnerTwo = $(
      ` 
      <option class="">
      ${categoryTitle}
    </option>
      `
    );


      categorySectionTwo.append(categoryPinnerTwo);

    $(".categoryModal").hide();

    categoryCreatingForm.trigger("reset");
  });

  const taskForm = $("#taskForm");

  $(".add-btn").click(function (event) {
    event.preventDefault();

    const taskBoard = $("#taskBoard");

    const titleBox = $("#titleBox").val();

    const taskDescription = $("#taskDescription").val();




    

    const taskPinner = $(`<div class="task-display-board"></div>`);

    taskPinner.html(`<div class="task-holder" id="taskHolder">

     <div class="task-title-and-option-bar">

      <p class="task-title" id="taskTitle">${titleBox}</p>

      <div><button class="edit-btn" id="editBtn">Edit</button><button class="delete-btn" id="deleteBtn">Delete</button></div>

     </div>

     <div class="task-details" id="taskDetails">${taskDescription}</div>

      <div class="category-color-and-task-marker">

        <div class="task-board-category-color">

        </div>

        <div class="task-maker">

          <label for=""><input type="checkbox" name="done" id="taskMarker" 
          class="task-marker">Done</label>

        </div>

      </div>

    </div>`);


    taskBoard.append(taskPinner);

    $(".modal").hide();

    taskForm.trigger("reset");


  });

 

  $(".cancel-btn").click(function (event) {
    event.preventDefault();

    $(".modal").hide();

    taskForm.trigger("reset");
  });

  $(document).on("click", ".task-marker", function () {
    let taskHolder = $(this).closest(".task-holder");

    if ($(this).prop("checked")) {
      taskHolder
        .find(".task-title, .task-details")
        .css("text-decoration", "line-through");
    } else {
      taskHolder
        .find(".task-title, .task-details")
        .css("text-decoration", "none");
    }
  });

  function hideDoneTask() {
    const taskHider = $("#taskHider");
    const taskMarker = $("#taskMarker");
    const taskHolder = $("#taskHolder");

    if (taskHider.prop("checked") && taskMarker.prop("checked")) {
      taskHolder.css("display", "none");
    } else {
      taskHolder.show();
    }
  }

  $("#taskHider").click(function () {
    hideDoneTask();
  });
 });