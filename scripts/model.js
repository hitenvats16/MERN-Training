export const salaryOperations = {
    basicSalary:0,
    da(basicSalary){
        console.log('inside da')
        return 0.2 * this.basicSalary
    },
    hra(basicSalary){
        console.log('inside hra')
        return 0.5 * this.basicSalary
    },
    ta(basicSalary){
        console.log('inside ta')
        return 0.3 * this.basicSalary
    },
    pf(basicSalary){
        console.log('inside pf')
        return 0.05 * this.basicSalary
    }
}

export function takeSalary(basicSalary){
    salaryOperations.basicSalary = basicSalary
}

export function netSalary(basicSalary){
    console.log('inside netSalary')
    return (salaryOperations.da(basicSalary)+salaryOperations.hra(basicSalary)+salaryOperations.ta(basicSalary))-salaryOperations.pf(basicSalary)+parseInt(basicSalary)
}

