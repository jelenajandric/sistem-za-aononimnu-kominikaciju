package org.unibl.etf.centralserver.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class MessageService {
    private final HashMap<Integer, List<String>> segmentsAndReceivers;

    public MessageService() {
        segmentsAndReceivers = new HashMap<>();
    }

    public synchronized void addSegment(String segment) {
        String receiverId = segment.split("#")[0];
        String textAndData = segment.substring(receiverId.length() + 1);
//        String textAndData = segment;

        if (segmentsAndReceivers.get(Integer.parseInt(receiverId)) == null) {
            ArrayList<String> segmentsArray = new ArrayList<>();
            segmentsArray.add(textAndData);
            segmentsAndReceivers.put(Integer.parseInt(receiverId), segmentsArray);
        } else {
            ArrayList<String> segmentsArray = (ArrayList<String>) segmentsAndReceivers.get(Integer.parseInt(receiverId));
            segmentsArray.add(textAndData);
        }
    }

    public synchronized List<String> getSegmentsForSpecificUser(int id) {
        List<String> result = segmentsAndReceivers.get(id);
        if (result != null) {
            segmentsAndReceivers.remove(id);
        }
        return result;
    }
}