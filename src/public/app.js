$(function () {

  const URI = 'http://127.0.0.1:3000/comment';

  // GET PRODUCTS
  $('#getProducts').on('click', () => {
    $.ajax({
      url: URI,
      success: function (products) {
        let tbody = $('tbody');
        tbody.html('');
        products.forEach(product => {
          tbody.append(`
              <tr>
                <td class="id">${product.id}</td>
                <td>
                  <input type="text" class="text" value="${product.text}"/>
                </td>
                <td>
                  <button class="update-button">UPDATE</button>
                  <button class="delete-button">LISTEN AUDIO</button>
                </td>
              </tr>
          `)
        })
      }
    });
  });

  // POST PRODUCTS
  $('#productForm').on('submit', (e) => {
    e.preventDefault();
    let newProduct = $('#newProduct');    
    
    var text = JSON.stringify({
      text: newProduct.val()
    })
    
    $.ajax({
      url: URI,
      method: 'POST',
      data: text,   
      contentType: 'application/json',
      success: function(response) {        
       newProduct.val('');
       $('#getProducts').click();
      },
      error: function (err) {        
        console.log(err);
      }
    });    
  });
  
  $('table').on('click', '.update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let text = row.find('.text').val();      

    var text2 = JSON.stringify({
      text: text
    })

    $.ajax({
      url: `${URI}/${id}`,
      method: 'PATCH',
      data: text2,
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        $('#getProducts').click();
      }
    });
  });

  $('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'GET',
      success: function (response) {
       $('#getProducts').click();
      }
    });
  });

});
