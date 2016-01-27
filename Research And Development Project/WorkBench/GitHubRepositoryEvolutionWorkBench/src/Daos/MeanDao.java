package Daos;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;

import Models.Mean;

public class MeanDao {
	public boolean insertMean(Mean mean){
		
		try {
			DBCollection userCollection = new dbConnectionBuilder().getMongoCollection("Mean");
		
			BasicDBObject documentDetail = new BasicDBObject();
			documentDetail.put("Mean", mean.getMean());
			documentDetail.put("ProjectName", mean.getProjectName());
	
			userCollection.insert(documentDetail);
		} catch(MongoException e){
			System.out.println(e);
			return false;
		}
		
		return true;	
	}

}
