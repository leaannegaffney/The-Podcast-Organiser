$(".delepisode").click(function(){
  return confirm('Really delete this episode?');
});

$(".delplaylist").click(function(){
  return confirm('Really delete this playlist?');
});

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}