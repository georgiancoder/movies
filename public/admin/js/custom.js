function deleteDirectorAvatar(id, el){
  var that = el;
  $.ajax({
    url: '/admin/removediravatar',
    data: {id: id},
    type: 'PUT',
    success: function(msg){
      if(msg && msg.success){
        location.reload();
      }
    }
  })
}

function deleteDirector(id,el){
  var that = el;
  $.ajax({
    url: '/admin/deldirector',
    data: {id: id},
    type: 'DELETE',
    success: function(msg){
      if(msg && msg.success){
        $(that).parent().parent().remove();
      }
    },
    error: function(xhr){
      alert(xhr.status);
    }
  })
}
