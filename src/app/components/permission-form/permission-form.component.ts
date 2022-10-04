import { Component } from "@angular/core";
import {
  FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

import { MyErrorHandler } from "../../utils/error-handler";
import { PermissionFormService } from "./permission-form.service";

@Component({
  selector: "app-permission-form",
  templateUrl: "./permission-form.component.html",
  styleUrls: ["./permission-form.component.scss"],
})
export class PermissionFormComponent {
  permissionFormId: string = "";
  permissionFormForm: FormGroup;
  permissionFormToEdit: any;
  isAddModule: boolean = true;
  isLoading: boolean = false;
  // SET PERMISSIONS
  permissionsToCheck = JSON.parse(sessionStorage.getItem("permission")!)[0].modulePermissions;
  updateOnePermission: any;
  createOnePermission: any;

  moduleIdSelectObject: Array<any> = [];
  permissionActionsSelectObject: Array<any> = [];
  permissionFormBuilder = {
    name: [
      {
        value: null,
        disabled: false,
      },
      [Validators.required],
    ],

    description: [
      {
        value: null,
        disabled: false,
      },
      [],
    ],

    isAdminPermission: [false, []],

    modulePermissions: this._formBuilder.array([]),
  };
  modulePermissionsBuilder = {
    moduleId: [null, []],

    permissionActions: [[], []],
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _permissionFormService: PermissionFormService,
    private _errorHandler: MyErrorHandler
  ) {
    try {
      const modulePermissionToCheck: any = this.permissionsToCheck.find((item: any) => item.module.name === "Grupo de permissões");
      this.updateOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "updateOne").length > 0;
      this.createOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "createOne").length > 0;

      this._activatedRoute.params.subscribe(async (routeParams) => {
        this.permissionFormId = routeParams["id"];
        this.isAddModule = !this.permissionFormId;

        if (this.permissionFormId) {
          this.permissionFormToEdit = await this._permissionFormService.find(
            this.permissionFormId
          );
          this.permissionFormForm.patchValue(this.permissionFormToEdit.data);

          (this.permissionFormForm.get(
            "modulePermissions"
          ) as FormArray).clear();
          this.permissionFormToEdit.data.modulePermissions?.forEach(
            (_modulePermissions: any) => {
              const modulePermissionsForm = this.initModulePermissions();
              modulePermissionsForm.patchValue(_modulePermissions);
              (this.permissionFormForm.get(
                "modulePermissions"
              ) as FormArray).push(modulePermissionsForm);
            }
          );
        }
        this.checkOptionsCreation(
          [this.setModuleIdSelectObject, this.setPermissionActionsSelectObject],
          0
        );
      });
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this.sendErrorMessage(message);
    }

    this.permissionFormForm = this._formBuilder.group(
      this.permissionFormBuilder
    );
  }

  initModulePermissions() {
    return this._formBuilder.group(this.modulePermissionsBuilder);
  }

  addModulePermissions() {
    const control = <FormArray>(
      this.permissionFormForm.get(["modulePermissions"])
    );
    control.push(this.initModulePermissions());
  }

  getModulePermissions(form: any) {
    return form.controls.modulePermissions.controls;
  }

  removeModulePermissions(i: any) {
    const control = <FormArray>(
      this.permissionFormForm.get(["modulePermissions"])
    );
    control.removeAt(i);
  }

  setModuleIdSelectObject = async () => {
    try {
      const array: any = await this._permissionFormService.moduleIdSelectObjectGetAll();
      if (array.data?.result) {
        array.data?.result.map((object: any) => {
          this.moduleIdSelectObject.push({
            label: object.name,
            value: object._id,
          });
        });
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this.sendErrorMessage(message);
    }
  };

  setPermissionActionsSelectObject = async () => {
    try {
      const array: any = await this._permissionFormService.permissionActionsSelectObjectGetAll();
      if (array.data?.result) {
        array.data?.result.map((object: any) => {
          this.permissionActionsSelectObject.push({
            label: object.name,
            value: object._id,
          });
        });
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this.sendErrorMessage(message);
    }
  };

  permissionFormSubmit = async (
    permissionFormDirective: FormGroupDirective
  ) => {
    this.isLoading = true;

    try {
      if (this.isAddModule) {
        await this._permissionFormService.save(this.permissionFormForm.value);
      }

      if (!this.isAddModule) {
        await this._permissionFormService.update(
          this.permissionFormForm.value,
          this.permissionFormId
        );
      }
      this.redirectTo("main/__permission-group");

      this.isLoading = false;
    } catch (error: any) {
      if (error.logMessage === "jwt expired") {
        await this.refreshToken();
        this.permissionFormSubmit(permissionFormDirective);
      } else {
        const message = this._errorHandler.apiErrorMessage(error.message);
        this.isLoading = false;
        this.sendErrorMessage(message);
      }
    }

    this.permissionFormForm.reset();
    permissionFormDirective.resetForm();
  };
  refreshToken = async () => {
    try {
      const res: any = await this._permissionFormService.refreshToken();
      if (res) {
        sessionStorage.setItem("token", res?.data.authToken);
        sessionStorage.setItem("refreshToken", res?.data.authRefreshToken);
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this.isLoading = false;
      this.sendErrorMessage(message);
      sessionStorage.clear();
      this._router.navigate(["/"]);
    }
  };
  redirectTo = (uri: string) => {
    this._router
      .navigateByUrl("/main", { skipLocationChange: true })
      .then(() => {
        this._router.navigate([uri]);
      });
  };
  checkOptionsCreation = async (functions: Array<Function>, index: number) => {
    const newIndex = index + 1;

    if (newIndex <= functions.length) {
      await functions[index].call(null);
      this.checkOptionsCreation(functions, newIndex);
    } else {
      this.isLoading = false;
    }
  };
  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
      duration: 4 * 1000,
    });
  };
}
