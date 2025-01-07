

const changeDataFormatLabel = (parameters) => {

  parameters.forEach( (parameter) => {
    switch(parameter.format) {
      case 'Signed':
        parameter.format = '16-bit'
        break
      case '32-bit Signed Big-Endian':
        parameter.format = '32-bit'
        break;
      case '32-bit Signed Big-Endian byte swap':
        parameter.format = '32-bit Inverse'
        break;
      case '64-bit Signed Big-Endian':
        parameter.format = '64-bit'
        break;
      case '64-bit Signed Big-Endian byte swap':
        parameter.format = '64-bit Inverse'
        break;
      case '32-bit Float Big-Endian':
        parameter.format = 'Float'
        break;  
      case '32-bit Float Big-Endian byte swap':
        parameter.format = 'Float Inverse'
        break;
      case '64-bit Double Big-Endian':
        parameter.format = 'Double'
        break;
      case '64-bit Double Big-Endian byte swap':
        parameter.format = 'Double Inverse'
        break;
    }
  })

}

export default changeDataFormatLabel;