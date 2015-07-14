$(document).ready(function(){

    function Todo(date, title, description){
        //this.client = client;
        this.date = date;
        this.title = title;
        this.description = description;
    }

    var todoList = [];


    function newTodo(){
        var dateString = $('#date').val();
        var newDate = moment(dateString).format('MM/DD/YYYY');

        //var client = $('#client option:selected').val();
        var date = newDate;
        var title = $('#title').val();
        var description = $('#description').val();

        var newTodoItem = new Todo (date, title, description);
        todoList.push(newTodoItem);
        localStorage.todoList = JSON.stringify(todoList);
        returnTodoList();

    }

    function checkSaved(){

        if (typeof localStorage.todoList !== 'undefined' && localStorage.todoList.length > 0) {
            todoList = JSON.parse(localStorage.todoList);
            returnTodoList();
        } else {
            todoList = [];
        }

    }
    checkSaved();

    $('#addtodo').on('click', function(){
        newTodo();
        clearForm();
       checkSaved();

    });


    function returnTodoList(){
        var data = '';
        $('ul').html('');

        todoList.sort(function(a, b){
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            // Compare the 2 dates
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });

        for (i = 0; i < todoList.length; i++) {
            data = todoList[i];
            var getDate = data.date;
            var getTitle = data.title;
            var getDescription = data.description;
            var gotDate = isToday();
            function isToday(){
                var newDate = moment(getDate).format('MM/DD/YYYY');
                var todayDate = moment().format('MM/DD/YYYY');

                 if (newDate === todayDate){

                     gotDate ='Today';

                 }else if (newDate < todayDate) {
                     gotDate ='LATE!';
                 }else {
                         gotDate = newDate

                 }

                return gotDate;
            }

            var dateTemp = '<p>Due Date: ' + gotDate +  '</p>';
            var titleTemp = '<h4>' + getTitle +  '</h4>';
            var descriptTemp = '<p>' + getDescription +  '</p>';
            isToday();
            $('ul').append('<li>' + titleTemp + descriptTemp + dateTemp + '</li>' );
        }
    }


    $('ul').on('dblclick', 'li', function(){
        var pos = $(this).index('ul li');
        todoList.splice(pos, 1);
        console.log(todoList);
        localStorage.todoList = JSON.stringify(todoList);
        $(this).remove();
    });


    function clearForm(){
        $('#date').val('');
        $('#title').val('');
        $('#description').val('');
    }

    $(function() {
        $( 'ul' ).sortable({
            revert: true
        });
        $( 'li' ).draggable({
            connectToSortable: "ul",
            //helper: "clone",
            revert: "invalid"
        });
        //$( "ul, li" ).disableSelection();
    });




});


