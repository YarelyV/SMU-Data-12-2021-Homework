--1. List the following details of each employee: employee number, last name, first name, sex, and salary.
Select 
	e.emp_no,
	last_name,
	first_name,
	sex,
	salary
from 
	Employees e 
	join salaries s on e.emp_no = s.emp_no;

--2. List first name, last name, and hire date for employees who were hired in 1986.
Select
	first_name,
	last_name,
	hire_date
from 
	Employees 
where 
	extract(year from hire_date) = 1986
order by 
	hire_date asc;

--3. List the manager of each department with the following information: department number, 
--department name, the manager's employee number, last name, first name.

select 
	d.dept_no,
	d.dept_name,
	dm.emp_no,
	e.last_name,
	e.first_name

from 
	departments d 
	join dept_manager dm on d.dept_no = dm.dept_no
	join employees e on e.emp_no = dm.emp_no;

--4. List the department of each employee with the following information: employee number,
--last name, first name, and department name

select 
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from 
	employees e 
	join dept_emp de on e.emp_no = de.emp_no
	join departments d on d.dept_no = de.dept_no;

--5. List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
Select 
	first_name,
	last_name,
	sex
from 
	Employees 
where 
	first_name = 'Hercules' 
	and last_name like 'B%'

--6. List all employees in the Sales department, including their employee number, last name, first name, and department name.
select 
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from 
	employees e 
	join dept_emp de on e.emp_no = de.emp_no
	join departments d on d.dept_no = de.dept_no
where 
	dept_name = 'Sales';

--7. List all employees in the Sales and Development departments, including their employee number, last name, 
--first name, and department name.
select 
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from 
	employees e 
	join dept_emp de on e.emp_no = de.emp_no
	join departments d on d.dept_no = de.dept_no
where 
	dept_name = 'Sales' 
	OR dept_name = 'Development' ;

--8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

Select 
	last_name,
	count(last_name) as Frequency
from 
	Employees
group by 
	last_name
order by 
	Frequency desc

--epilogue
select 
	* 
from 
	Employees
where 
	emp_no = 499942

--