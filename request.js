const createXhrObject = (method, url) => {
  let xhr = new XMLHttpRequest();

  const cors = url.indexOf(location.host) === -1 || !stringStartsWith(url, "/");

  if (!cors || "withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method.toLowerCase(), url);
  } else {
    xhr = null;
  }

  return xhr;
};

const getJson = (url, onSuccess) => {
  const request = createXhrObject("GET", url);

  let isJsonData = true;

  request.onload = () => {
    const success = (request.status >= 200 && request.status < 400);
    if (success) {
      let ajaxData = request.responseText;
      if (isJsonData) {
        ajaxData = JSON.parse(ajaxData);
      }
      onSuccess(ajaxData);
    } else {
      console.error("AjaxCache Request Error", request.status, request.responseText);
    }
  };

  request.onerror = () => {
    console.error("AjaxCache Request Error", request.status, request.responseText);
  };

  request.send();
};

export default getJson;
