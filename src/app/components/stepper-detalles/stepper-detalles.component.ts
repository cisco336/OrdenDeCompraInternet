import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { ComponentsService } from "src/app/services/components.service";

@Component({
  selector: "app-stepper-detalles",
  templateUrl: "./stepper-detalles.component.html",
  styleUrls: ["./stepper-detalles.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StepperDetallesComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedSku;

  constructor(
    private _formBuilder: FormBuilder,
    private _componentService: ComponentsService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this._componentService.getSelectedSku().subscribe(data => {
      this.selectedSku = data;
    })
  }
}
