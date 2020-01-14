# frozen_string_literal: true

describe OrganizationsUser, :postgres do
  let(:organization) { create(:organization) }
  let(:user) { create(:user) }

  describe ".remove_admin_rights_from_user" do
    subject { OrganizationsUser.remove_admin_rights_from_user(user, organization) }

    context "when user is not a member of the organization" do
      it "does not add the user to the organization" do
        expect(subject).to eq(nil)
        expect(organization.users.count).to eq(0)
      end
    end

    context "when user a member of the organization" do
      before { organization.add_user(user) }

      it "does nothing" do
        expect(subject).to eq(true)
        expect(organization.admins.count).to eq(0)
      end
    end

    context "when user an admin of the organization" do
      before { OrganizationsUser.make_user_admin(user, organization) }

      it "removes admin rights from the user" do
        expect(organization.admins.count).to eq(1)
        expect(subject).to eq(true)
        expect(organization.admins.count).to eq(0)
      end
    end
  end

  fdescribe ".make_user_admin" do
    subject { OrganizationsUser.make_user_admin(user, organization) }

    it "returns an instance of OrganizationsUser" do
      expect(subject).to be_a(OrganizationsUser)
    end
  end

  describe ".modify_decision_drafting" do
    before { FeatureToggle.enable!(:use_judge_team_role) }
    after { FeatureToggle.disable!(:use_judge_team_role) }
    let(:judge) { create(:user) }
    let(:judge_team) { JudgeTeam.create_for_judge(judge) }
    let(:judge_team_org_user) { judge_team.add_user(user) }

    it "toggles the judge team role" do
      expect(judge_team_org_user.judge_team_role.type).to eq(DecisionDraftingAttorney.name)
      OrganizationsUser.modify_decision_drafting(judge_team_org_user, judge_team)
      expect(judge_team_org_user.reload.judge_team_role.type).to eq(nil)
    end
  end
end
