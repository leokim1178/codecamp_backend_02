import{getToday} from './utils.js'

export function checkValidationEmail({email}){
    if(email.includes("@")===false || email.includes(".")===false ||email===undefined){
        console.log("이메일을 제대로 입력해주세요")
        return false
    } else{
        return true
    }
}

export function getWelcomeTemplate({name,age,school,email,password}){
    
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!</h1>
                <hr />
                <div> 이름 : ${name} </div>
                <div> 나이 : ${age}</div>
                <div> 학교 : ${school}</div>
                <div>가입일: ${getToday()}</div>
                <div>이메일: ${email}</div>
                <div>비밀번호: ${password}</div>
            </body>
        </html>
        `
}

export function sendEmail(email,mytemplate){
    console.log(`${email} 이메일로 ${mytemplate}를 전송합니다`)
}