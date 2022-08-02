var salaryOperations = {
    da(basicSalary){
        console.log('inside da')
        return 0.2 * basicSalary
    },
    hra(basicSalary){
        console.log('inside hra')
        return 0.5 * basicSalary
    },
    ta(basicSalary){
        console.log('inside ta')
        return 0.3 * basicSalary
    }
}