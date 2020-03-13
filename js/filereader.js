// Found Code
function readFile(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x => resolve(fr.result);
    fr.readAsText(file);
  });
}

async function read(input) {
  let markup = '';
  let fileContent = await readFile(input.files[0]);
  //  msg.innerText = fileContent;
  let p4Obj = JSON.parse(fileContent);
  console.log(p4Obj);
  //disJsonObj.innerText = jsonObj.Meta.Type;
  let layout = document.getElementById('disJsonObj');
  switch (p4Obj.Meta.Type) {
    // Value Variable
    case 'p4vv':
      markup = p4vv(p4Obj);
      layout.innerHTML = markup;
      break;
    // Global Logic
    case 'p4gl':
      markup = p4gl(p4Obj);
      layout.innerHTML = markup;
      break;
    // File Definition
    case 'p4fl':
      markup = p4fl(p4Obj);
      layout.innerHTML = markup;
      break;
    default:
      layout.innerHTML = `Unknown Pro-IV Object Type`;
  }
}

/**
 * Represents a line of Pro-IV logic.
 * @param {string} line String of text - Pro-IV code in this case.
 * @param {number} index Index of the element - Pro-IV line number.
 */
function codeLinesTemplate(line, index) {
  return `<div class="row">
            <div class="col-1 text-monospace" >${index.toLocaleString(undefined, {
              minimumIntegerDigits: 3,
              maximumIntegerDigits: 3
            })}</div>
            <div class="col text-monospace">${line}</div>
          </div>`;
}

function p4fl(p4Obj) {
  return `
    <div class="container-fluid">
      <div class="row">
        <h4>Global Logic</h4>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Name</div>
        <div class="col">${p4Obj.Name}</div>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Description</div>
        <div class="col">${p4Obj.Description}</div>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Alternate</div>
        <div class="col">${p4Obj.PhysicalFileName}</div>
      </div>
      <div class="row">
        <div class="col-1-2 font-weight-bold">Security Category</div>
        <div class="col">${p4Obj.SecurityCategory}</div>
        <div class="col-1 font-weight-bold">Type</div>
        <div class="col">${p4Obj.Type}</div>
      </div>
        <div class="row">
            <div class="col-1 font-weight-bold" >Line</div>
            <div class="col font-weight-bold">Code</div>
        </div>
        p4Obj.Lines.map(codeLinesTemplate).join(' ')}
    </div>
      `;
}

function p4gl(p4Obj) {
  return `
    <div class="container-fluid">
      <div class="row">
        <h4>Global Logic</h4>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Name</div>
        <div class="col">${p4Obj.Name}</div>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Description</div>
        <div class="col">${p4Obj.Description}</div>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold">Security Category</div>
        <div class="col">${p4Obj.SecurityCategory}</div>
        <div class="col-1 font-weight-bold">Type</div>
        <div class="col">${p4Obj.Type}</div>
      </div>
      <div class="row">
        <div class="col-1 font-weight-bold" >Line</div>
        <div class="col font-weight-bold">Code</div>
      </div>
      ${p4Obj.Lines.map(codeLinesTemplate).join(' ')}
    </div>
      `;
}

function p4vv(p4Obj) {
  return `
      <div class="container-fluid">
        <div class="row">
          <h4>Value Variable</h4>
        </div>
        <div class="row">
          <div class="col font-weight-bold">Name</div>
          <div class="col">${p4Obj.Name}</div>
        </div>
        <div class="row">
          <div class="col font-weight-bold">Description</div>
          <div class="col">${p4Obj.Description}</div>
        </div>
        <div class="row">
          <div class="col font-weight-bold">Value</div>
          <div class="col">${p4Obj.AlphaValue ? p4Obj.AlphaValue : p4Obj.NumericValue}</div>
          <div class="col font-weight-bold">Display Code</div>
          <div class="col">${p4Obj.NumericDisplayCode}</div>
        </div>
      </div>
      `;
}
