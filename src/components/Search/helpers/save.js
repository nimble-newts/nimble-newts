const handleSave = (target) => {
  let name = $(target[0].parentNode).find('.name')[0].textContent;
  let address = $(target[0].parentNode).find('.address1')[0].textContent;
  let city = $(target[0].parentNode).find('.city')[0].textContent;
  let zip = $(target[0].parentNode).find('.zip')[0].textContent;
  let url = $(target[0].parentNode).find('.url')[0].textContent;

  FB.api('/me', res => {
    let locOptions = {
      body: JSON.stringify({
        userID: res.id,
        name: name,
        address: address,
        city: city,
        zip: zip,
        url: url
      }),
      headers: { 
        'Content-type': 'application/json'
      }
    };

    if (target.attr('data-action') === 'save') {
      locOptions.method = 'post';
      fetch('/suggestions', locOptions).then(res => {
        target.html('<i class="heart icon"></i>');
        target.attr('data-action', 'unsave');
      });
    } else {
      locOptions.method = 'put';
      fetch('/suggestions', locOptions).then(res => {
        target.html('<i class="empty heart icon"></i>');
        target.attr('data-action', 'save');
      });
    }
  });
};

export { handleSave };