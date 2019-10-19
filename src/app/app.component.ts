import { Component, ViewChild, ElementRef } from "@angular/core";
import { FormBuilderComponent } from "angular-formio";
import { FormBuilder } from "formiojs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("referenciaForm", { static: true })
  referenciaPadre: FormBuilderComponent;
  private rerenciaFormBuilder: FormBuilder;
  private referenciaWebFormBuilder: any;
  private gruposWebBuilder: any;

  public formSet: any;

  title = "testing-formio-angular";

  constructor() {
    this.formSet = {
      title: "My Test Form",
      components: [
        {
          label: "entityRef",
          cellAlignment: "left",
          customClass: "",
          striped: false,
          bordered: false,
          hover: false,
          condensed: false,
          hidden: false,
          alwaysEnabled: false,
          tableView: true,
          key: "entityRef",
          tags: "",
          properties: {},
          conditional: {
            show: null,
            when: null,
            eq: "",
            json: ""
          },
          customConditional: "",
          logic: [],
          attributes: {},
          overlay: {
            style: "",
            page: "",
            left: "",
            top: "",
            width: "",
            height: ""
          },
          type: "entityRef",
          input: true,
          placeholder: "Yea boi",
          prefix: "",
          suffix: "",
          multiple: false,
          defaultValue: null,
          protected: false,
          unique: false,
          persistent: true,
          clearOnHide: true,
          refreshOn: "",
          redrawOn: "",
          labelPosition: "top",
          description: "",
          errorLabel: "",
          tooltip: "",
          hideLabel: false,
          tabindex: "",
          disabled: false,
          autofocus: false,
          dbIndex: false,
          customDefaultValue: "",
          calculateValue: "",
          widget: {},
          validateOn: "change",
          validate: {
            required: false,
            custom: "",
            customPrivate: false,
            strictDateValidation: false,
            minLength: "",
            maxLength: "",
            pattern: ""
          },
          allowCalculateOverride: false,
          encrypted: false,
          showCharCount: false,
          showWordCount: false,
          allowMultipleMasks: false,
          mask: false,
          inputType: "text",
          inputFormat: "plain",
          inputMask: "",
          id: "e0siu89"
        },
        {
          input: true,
          label: "Submit",
          tableView: false,
          key: "submit",
          size: "md",
          leftIcon: "",
          rightIcon: "",
          block: false,
          action: "submit",
          disableOnInvalid: true,
          theme: "primary",
          type: "button"
        }
      ]
    };
  }

  ngOnInit(): void {
    this.referenciaPadre.ready.then(data => {
      this.agregarEsquemasPersonalizados();
      this.rerenciaFormBuilder = this.referenciaPadre.builder;
      this.referenciaWebFormBuilder = this.rerenciaFormBuilder.instance;
      this.gruposWebBuilder = this.referenciaWebFormBuilder.builder;
      let basic = this.gruposWebBuilder.basic;
      let custom = this.extenderTextfield(
        JSON.parse(JSON.stringify(basic.components.textfield))
      );
      basic.componentOrder = ["textfield", "entityRef"];
      basic.components = {
        textfield: basic.components.textfield,
        entityRef: custom
      };
      this.gruposWebBuilder.basic = basic;
      this.rerenciaFormBuilder.render();
      this.rerenciaFormBuilder.build();
      console.log(this.referenciaPadre);
    });
  }

  private agregarEsquemasPersonalizados() {
    let heredadaTextField = JSON.parse(
      JSON.stringify(this.referenciaPadre.builder.instance.schemas.textfield)
    );
    heredadaTextField.key = "entityRef";
    heredadaTextField.label = "entityRef";
    heredadaTextField.placeholder = "Yea boi";
    heredadaTextField.widget = {};
    heredadaTextField.type = "entityRef";
    this.referenciaPadre.builder.instance.schemas[
      "entityRef"
    ] = heredadaTextField;
  }

  private extenderTextfield(textFieldComp: any) {
    console.log(textFieldComp);
    textFieldComp.key = "entityRef";
    textFieldComp.title = "entityRef";
    textFieldComp.schema.placeholder = "Soy customizado dinamicamente";
    textFieldComp.schema.label = "Soy un label custom";
    textFieldComp.schema.widget = {};
    textFieldComp.schema.key = "entityRef";
    textFieldComp.schema.type = "entityRef";

    return textFieldComp;
  }
}
