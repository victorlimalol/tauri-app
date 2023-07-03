import { Dexie } from "dexie";

export interface Contact {
  id?: number;
  name: string;
  cnpj: string;
  corporateName: string;
  email: string;
  productSelected: string;
  comments: string;
  sync: boolean;
}

export interface SatisfactionSurveyPartner {
  id?: number;
  isPartner: boolean;
  satisfaction: number;
  recommendToFriend: boolean;
  howDidYouMeet: string;
  sync: boolean;
}

export interface SatisfactionSurveyNoPartner {
  id?: number;
  isPartner: boolean;
  whatIsMissing: string;
  howDidYouMeet: string;
  sync: boolean;
}

class LocalDatabase {
  private db: Dexie;
  public contacts: Dexie.Table<Contact, number>;
  public surveyPartner: Dexie.Table<SatisfactionSurveyPartner, number>;
  public surveyNoPartner: Dexie.Table<SatisfactionSurveyNoPartner, number>;

  constructor() {
    this.db = new Dexie("TimeFormLocalDB");
    this.db.version(4).stores({
      contacts: '++id, name, cnpj, corporateName, email, productSelected, comments, sync',
      surveyPartner: '++id, isPartner, satisfaction, recommendToFriend, howDidYouMeet, sync',
      surveyNoPartner: '++id, isPartner, whatIsMissing, howDidYouMeet, sync',
    });

    this.contacts = this.db.table<Contact, number>("contacts");
    this.surveyPartner = this.db.table<SatisfactionSurveyPartner, number>("surveyPartner");
    this.surveyNoPartner = this.db.table<SatisfactionSurveyNoPartner, number>("surveyNoPartner");
  }

  public async saveContact(contact: Contact) {
    await this.contacts.add(contact);
  }

  public async saveSurveyPartner(survey: SatisfactionSurveyPartner) {
    return await this.surveyPartner.add(survey);
  }

  public async saveSurveyNoPartner(survey: SatisfactionSurveyNoPartner) {
    return await this.surveyNoPartner.add(survey);
  }

  public async getTables() {
    return {
      "contacts": this.contacts,
      "surveyPartner": this.surveyPartner,
      "surveyNoPartner": this.surveyNoPartner
    }
  } 
}

export default LocalDatabase;