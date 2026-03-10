/* ===================================
   PURE JAVASCRIPT ALGEBRA SOLVER
   No external libraries required
=================================== */

// expand brackets like 3(x+2)
function expand(expr){

return expr.replace(/(\d+)\(([^)]+)\)/g,function(_,a,b){

let parts=b.split(/(?=[+-])/)

let result=parts.map(p=>a+"*"+p).join("+")
return result

})

}

// convert equation to standard form ax²+bx+c=0
function parseEquation(eq){

eq=eq.replace(/\s+/g,'')

let sides=eq.split("=")

if(sides.length!==2) return null

let left=expand(sides[0])
let right=expand(sides[1])

let expr=left+"-("+right+")"

// convert ^ to **
expr=expr.replace(/\^/g,"**")

let a=0,b=0,c=0

// detect x²
let quad=expr.match(/([+-]?\d*)x\*\*2/)

if(quad){

a=quad[1]
if(a===""||a==="+") a=1
if(a==="-" ) a=-1
a=Number(a)

}

// detect x
let lin=expr.match(/([+-]?\d*)x(?!\*)/)

if(lin){

b=lin[1]
if(b===""||b==="+") b=1
if(b==="-" ) b=-1
b=Number(b)

}

// constant
let constMatch=expr.replace(/[+-]?\d*x\*\*2/g,'')
                   .replace(/[+-]?\d*x/g,'')
                   .match(/[+-]?\d+/)

if(constMatch) c=Number(constMatch[0])

return {a:a,b:b,c:c}

}

// solve equation
function solveAlgebra(eq){

let p=parseEquation(eq)

if(!p) return null

let a=p.a
let b=p.b
let c=p.c

// linear
if(a===0 && b!==0){

let x=-c/b
return "x = "+x

}

// quadratic
if(a!==0){

let d=b*b-4*a*c

if(d<0) return "No real solution"

let x1=(-b+Math.sqrt(d))/(2*a)
let x2=(-b-Math.sqrt(d))/(2*a)

return "x = "+x1+" or x = "+x2

}

return null

}

