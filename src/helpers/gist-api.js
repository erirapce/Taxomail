function getUserGists(user, callback) {
  const requestUrl = "https://api.github.com/users/" + user + "/gists";

  $.ajax({
    url: requestUrl,
    dataType: "json",
  })
    .done(function (gists) {
      callback(gists);
    })
    .fail(function (error) {
      callback(null, error);
    });
}

function buildGistList(parent, gists, clickFunc) {
  gists.forEach(function (gist) {
    const listItem = $("<div/>").appendTo(parent);

    const radioItem = $("<input>")
      .addClass("ms-ListItem")
      .addClass("is-selectable")
      .attr("type", "radio")
      .attr("name", "gists")
      .attr("tabindex", 0)
      .val(gist.id)
      .appendTo(listItem);

    const descPrimary = $("<span/>").addClass("ms-ListItem-primaryText").text(gist.description).appendTo(listItem);

    const descSecondary = $("<span/>")
      .addClass("ms-ListItem-secondaryText")
      .text(" - " + buildFileList(gist.files))
      .appendTo(listItem);

    const updated = new Date(gist.updated_at);

    const descTertiary = $("<span/>")
      .addClass("ms-ListItem-tertiaryText")
      .text(" - Last updated " + updated.toLocaleString())
      .appendTo(listItem);

    listItem.on("click", clickFunc);
  });
}

function buildFileList(files) {
  let fileList = "";

  for (let file in files) {
    if (files.hasOwnProperty(file)) {
      if (fileList.length > 0) {
        fileList = fileList + ", ";
      }

      fileList = fileList + files[file].filename + " (" + files[file].language + ")";
    }
  }

  return fileList;
}
