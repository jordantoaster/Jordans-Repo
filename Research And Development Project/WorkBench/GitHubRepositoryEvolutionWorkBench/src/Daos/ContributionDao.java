package Daos;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoException;

import Models.Contributions;
import Utility.ResponseBase;

public class ContributionDao {
	
	public boolean insertContributions(Contributions contributions){
				
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Contributions");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Additions", contributions.getAdditions());
			documentDetail.put("Deletions", contributions.getDeletions());
			documentDetail.put("Loc", contributions.getLOC());
			documentDetail.put("Dates", contributions.getDates());
			documentDetail.put("Project", contributions.getProject());

		
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}
	
}
