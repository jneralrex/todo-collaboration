$(document).ready(function () {
  const taskBoard = $("#taskBoard");
  const taskForm = $("#taskForm");
  const categoryCreatingForm = $("#categoryCreatingForm");
  const title = $("#categoryTitle").val();
  const color = $("#categoryColor").val();
  const url = "http://todo.reworkstaging.name.ng/v1";
  const loggedUser = JSON.parse(localStorage.getItem("Task_Manager_User"));

  function postTags() {
    const tagInfo = {
      user_id: loggedUser.id,
      title: title,
      color: color,
    };

    $.ajax({
      url: `${url}/tags`,
      method: "POST",
      data: tagInfo,
      success: function (successFeedback) {
        if ((successFeedback.code = 404)) {
          alert(successFeedback.msg);
          console.log(successFeedback);
          return;
        } else {
          alert("Tag created");
        }
      },
      error: function (errorFeedback) {
        alert("Tags creation faild");
        console.log(errorFeedback);
      },
    });
  }

  function postTask() {
    const taskInfo = {
      tag_id: $("#tag_id").val(),
      title: $("#task_title").val(),
      content: $("#content").val(),
    };

    $.ajax({
      url: `${url}/tasks`,
      method: "POST",
      data: taskInfo,
      success: function (successFeedback) {
        console.log(successFeedback);
      },
      error: function (errorFeedback) {
        console.log(errorFeedback);
      },
    });
  }

  function getTags() {
    $.ajax({
      url: `${url}/tags?user_id=${loggedUser.id}`,
      method: "GET",
      done: function (data) {
        $.each(data, function (i, ele) {
          console.log(data);
          const categorySection = $(".categorySection");
          const categoryPinner = $(
            `<div class="category-display-board" style="background-color: ${ele.color}"></div>`
          );
          categoryPinner.append(`<div class="category-name-and-action" id="categoryNameSection">
        <p class="category-name" id="${ele.id}">${ele.title}</p>
            <div class="btn-holder">
              <button class="category-edit-btn category-action-btn"><img src="./images/icons8-edit-32.png" alt="" class="images"></button>
              <button class="category-delete-btn category-action-btn"><img src="./images/icons8-delete-24 (1).png" alt="" class="images"></button>
            </div>
        </div>`);

          categorySection.append(categoryPinner);
          const categorySectionTwo = $(".categorySectionTwo");
          const categoryPinnerTwo = $(
            `<option value="${ele.id}">
            ${ele.title}
            </option>
              `
          );
          categorySectionTwo.append(categoryPinnerTwo);
        });
      },
      fail: function (errorFeedback) {
        console.log(errorFeedback);
      },
    });
  }
  getTags();

  function getTask() {
    $.ajax({
      url: `${url}/tasks`,
      method: "GET",
      done: function () {
        $.each(data, function (i, ele) {
          const taskPinner = $(`<div class="task-display-board"></div>`);
          taskPinner.apeend(`<div class="task-holder" id="taskHolder">
              <div class="task-title-and-option-bar">
               <p class="task-title" id="taskTitle">${ele.title}</p>
               <div><button class="edit-btn action-btn" id="editBtn"><img src="./images/icons8-edit-32.png" alt="" class="images"></button><button class="delete-btn action-btn" id="deleteBtn"><img src="./images/icons8-delete-24 (1).png" alt="" class="images"></button></div>
              </div>
              <div class="task-details" id="taskDetails">${ele.content}</div>
               <div class="category-color-and-task-marker">
                 <div class="task-marker-section">
                   <label for=""><input type="checkbox" name="done" id="taskMarker"
                   class="task-marker">Done</label>
                 </div>
               </div>
             </div>`);
          taskBoard.append(taskPinner);
          $(".modal").hide();
          taskForm.trigger("reset");
        });
      },
      fail: function (errorFeedback) {
        console.log(errorFeedback);
      },
    });
  }

  $(".create-category-btn").click(function () {
    $(".categoryModal").show();
  });

  $(".add-category-btn").click(function (event) {
    event.preventDefault();
    postTags();
  });

  $(".cancel-category-btn").click(function (event) {
    event.preventDefault();
    $(".categoryModal").hide();
    taskForm.trigger("reset");
  });

  $(".task-adder").click(function () {
    $(".modal").show();
  });

  $(".add-btn").click(function (event) {
    event.preventDefault();
    postTask();
    getTask();
  });

});
