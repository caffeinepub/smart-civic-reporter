import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Setup mixin blend
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Issue Management System
  type IssueStatus = {
    #pending;
    #inProgress;
    #resolved;
  };

  module IssueStatus {
    public func fromText(text : Text) : IssueStatus {
      switch (text) {
        case ("pending") { #pending };
        case ("inProgress") { #inProgress };
        case ("resolved") { #resolved };
        case (_) { Runtime.trap("Invalid status. Valid options are: 'pending', 'inProgress', 'resolved.") };
      };
    };

    public func toText(status : IssueStatus) : Text {
      switch (status) {
        case (#pending) { "pending" };
        case (#inProgress) { "inProgress" };
        case (#resolved) { "resolved" };
      };
    };
  };

  type Issue = {
    id : Nat;
    name : Text;
    location : Text;
    issueType : Text;
    description : Text;
    photo : ?Storage.ExternalBlob;
    status : IssueStatus;
    createdAt : Time.Time;
  };

  module Issue {
    public func compareByCreatedAt(issue1 : Issue, issue2 : Issue) : Order.Order {
      Int.compare(issue2.createdAt, issue1.createdAt);
    };
  };

  let issueStorage = Map.empty<Nat, Issue>();
  var issueIdCounter = 4; // Start at 4 since we have 3 seed issues

  // Seed sample issues for demo
  private func seedIssues() {
    let issue1 : Issue = {
      id = 0;
      name = "John Doe";
      location = "Main Street & 5th Ave";
      issueType = "Pothole";
      description = "Large pothole causing traffic issues";
      photo = null;
      status = #pending;
      createdAt = Time.now() - 86400_000_000_000; // 1 day ago
    };

    let issue2 : Issue = {
      id = 1;
      name = "Jane Smith";
      location = "Park Avenue";
      issueType = "Garbage";
      description = "Overflowing garbage bins not collected for days";
      photo = null;
      status = #inProgress;
      createdAt = Time.now() - 172800_000_000_000; // 2 days ago
    };

    let issue3 : Issue = {
      id = 2;
      name = "Bob Johnson";
      location = "Elm Street";
      issueType = "Streetlight";
      description = "Streetlight not working, area is dark at night";
      photo = null;
      status = #resolved;
      createdAt = Time.now() - 259200_000_000_000; // 3 days ago
    };

    let issue4 : Issue = {
      id = 3;
      name = "Alice Williams";
      location = "Oak Boulevard";
      issueType = "WaterLeak";
      description = "Water leak from underground pipe flooding the street";
      photo = null;
      status = #pending;
      createdAt = Time.now() - 43200_000_000_000; // 12 hours ago
    };

    issueStorage.add(0, issue1);
    issueStorage.add(1, issue2);
    issueStorage.add(2, issue3);
    issueStorage.add(3, issue4);
  };

  seedIssues();

  public shared ({ caller }) func submitIssue(name : Text, location : Text, issueType : Text, description : Text, photo : ?Storage.ExternalBlob) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit issues");
    };

    let newIssue : Issue = {
      id = issueIdCounter;
      name;
      location;
      issueType;
      description;
      photo;
      status = #pending;
      createdAt = Time.now();
    };

    issueStorage.add(issueIdCounter, newIssue);
    let currentId = issueIdCounter;
    issueIdCounter += 1;
    currentId;
  };

  public query ({ caller }) func getIssues() : async [Issue] {
    issueStorage.values().toArray().sort<Issue>(Issue.compareByCreatedAt);
  };

  public shared ({ caller }) func updateIssueStatus(issueId : Nat, newStatusText : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update issue status");
    };

    switch (issueStorage.get(issueId)) {
      case (null) { Runtime.trap("Issue not found") };
      case (?issue) {
        let updatedIssue : Issue = {
          id = issueId;
          name = issue.name;
          location = issue.location;
          issueType = issue.issueType;
          description = issue.description;
          photo = issue.photo;
          status = IssueStatus.fromText(newStatusText);
          createdAt = issue.createdAt;
        };
        issueStorage.add(issueId, updatedIssue);
      };
    };
  };

  public shared ({ caller }) func adminLogin(password : Text) : async Bool {
    if (password == "admin123") {
      true;
    } else {
      false;
    };
  };
};
