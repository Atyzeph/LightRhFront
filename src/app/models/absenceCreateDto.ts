export interface AbsenceCreateDto {
    dateStart: Date;
	dateEnd: Date;
	motif : String; 
	label: String; 
	type: String;
	email: String;
}