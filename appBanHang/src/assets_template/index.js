$(document).ready(function(){
  $(document).off('click','#btnOpenModal');
  $(document).on('click','#btnOpenModal',function(){
    let modal=$(this).attr('data-modal');
    let title=$(this).attr('data-title');
    $('#'+modal).modal('show');
    $('#ModelTitle').text(title);
    $('#btnUpdate').text('Thêm mới');
  })


})
function CloseModal(){
  let modal=$('#btnOpenModal').attr('data-modal');
  $('#'+modal).modal('hide');
}

function SettitleModal(title,modal){
  $('#ModelTitle').text(title);
  $('#'+modal).modal('show');
}
