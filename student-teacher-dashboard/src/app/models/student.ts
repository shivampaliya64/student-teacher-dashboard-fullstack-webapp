export class Student {
    fname :string;
    lname :string;
    email :string;
    st_id :string;
    gender :string;
    class :number ;
    section :string;
    phno :number | null;
    marksheet : any | null=null;
    password :string;
    checked : boolean;

    file!: File;
    constructor(){
        this.fname='';
        this.lname='';
        this.email='';
        this.st_id='';
        this.gender='';
        this.class=0;
        this.section='';
        this.phno=null;
        this.marksheet=null;
        this.password='';
        this.checked=false;

    }
}
