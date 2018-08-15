module.exports = {
   foorb:function (id,rb) {
       let index=0;
       rb.forEach((v,i)=>{
           if(id==v.id)
           {
               index=i
           }
       })
       return index
   }
}