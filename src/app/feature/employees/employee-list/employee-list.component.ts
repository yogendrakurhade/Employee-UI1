import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'src/app/shared/toastr.service';
import { IEmployee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
    employees: IEmployee[] = [];
    detailedEmployee: IEmployee | undefined;

    constructor(
       private employeeService: EmployeeService,
       private toastr: ToastrService,
    ) { }

    ngOnInit() {
       // get all employees
       this.employeeService
          .getEmployees()
          .subscribe(employees => {
             this.employees = employees
          })
    }

    delete(id: number) {
       this.employeeService
          .deleteEmployee(id)
          .subscribe(() => {
             // update component
             this.employees = this.employees.filter(emp => emp.id !== id)
             this.toastr.success("Deleted successfully");
          })
    }

    getDetails(id: number) {
       this.employeeService
          .getEmployee(id)
          .subscribe(employee => this.detailedEmployee = employee);
    }

    public keepOriginalOrder = (a: any, b: any) => a.key;
 }
