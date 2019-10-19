/**
 * This file shows how to create a custom component and register that within an Angular application.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import Base from "formiojs/components/_classes/component/Component";
import editForm from "formiojs/components/table/Table.form";
import Components from "formiojs/components/Components";

/**
 * Create a new CheckMatrixComponent "class" using ES5 class inheritance notation.
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
 *
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class CheckMatrix extends Base {
  constructor(component, options, data) {
    super(component, options, data);
  }

  schema() {
    return Base.schema({
      type: "entityRef",
      numRows: 3,
      numCols: 3
    });
  }

  /**
   * Render returns an html string of the fully rendered component.
   *
   * @param children - If this class is extendended, the sub string is passed as children.
   * @returns {string}
   */
  render(children) {
    // To make this dynamic, we could call this.renderTemplate('templatename', {}).
    console.log(this.component)
    let tableClass = "table ";
    ["striped", "bordered", "hover", "condensed"].forEach(prop => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });

    let content = "";

    for (let i = 0; i < this.component.numRows; i++) {
      let row = "<tr>";
      for (let j = 0; j < this.component.numCols; j++) {
        let cell = "<td>";

        cell += this.renderTemplate("input", {
          input: {
            type: "input",
            ref: `${this.component.key}-${i}`,
            attr: {
              id: `${this.component.key}-${i}-${j}`,
              class: "form-control",
              type: "checkbox"
            }
          }
        });

        cell += "</td>";
        row += cell;
      }
      row += "</tr>";
      content += row;
    }

    // Calling super.render will wrap it html as a component.
    return super.render(`
    <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text">Left addon</span>
    </div>
    <h1>${this.component.label}</h1>
    <input type="text" class="form-control">
    <div class="input-group-append">
      <span class="input-group-text">Right addon</span>
    </div>
  </div>
    `);
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {};

    for (let i = 0; i < this.component.numRows; i++) {
      refs[`${this.component.key}-${i}`] = "multiple";
    }

    this.loadRefs(element, refs);

    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(
        this.refs[`${this.component.key}-${i}`],
        0
      );

      // Attach click events to each input in the row
      this.checks[i].forEach(input => {
        this.addEventListener(input, "click", () => this.updateValue());
      });
    }

    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    var value = [];
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      value[rowIndex] = [];
      for (var colIndex in row) {
        var col = row[colIndex];
        value[rowIndex][colIndex] = !!col.checked;
      }
    }
    return value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    if (!value) {
      return;
    }
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      if (!value[rowIndex]) {
        break;
      }
      for (var colIndex in row) {
        var col = row[colIndex];
        if (!value[rowIndex][colIndex]) {
          return false;
        }
        let checked = value[rowIndex][colIndex] ? 1 : 0;
        col.value = checked;
        col.checked = checked;
      }
    }
  }
}

// Use the table component edit form.
CheckMatrix.editForm = editForm;
CheckMatrix.builderInfo = {
  title: "entityRef",
  group: "basic",
  icon: "fa fa-table",
  weight: 70,
  documentation: "http://help.form.io/userguide/#table",
  schema: Base.schema({
    type: "entityRef",
    numRows: 3,
    numCols: 3
  })
};

// Register the component to the Formio.Components registry.
Components.addComponent("entityRef", CheckMatrix);
