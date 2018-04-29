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
